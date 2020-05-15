import psycopg2, time, hashlib, re
from psycopg2.pool import SimpleConnectionPool
from prettytable import PrettyTable


class Service:

    def __init__(self, username: str, password: str, public = False):
        self.cp = SimpleConnectionPool(1, 5, user="postgres", password="2017ustc", host="sh.wtd2.top", port="5432", database="12306")
        if not public:
            self.password_check(username, password.encode('utf-8'))
            self.passenger_info()

    def password_check(self, username: str, password: bytes):
        pattern = re.compile('([^a-z0-9A-Z])+')
        if pattern.findall(username):
            raise Exception('Invalid username')
        sha_pass = hashlib.sha256(password).hexdigest()
        stmt = "select * from user_info where user_name = %s"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        cursor.execute(stmt, (username, ))
        result = cursor.fetchall()
        cursor.close()
        self.cp.putconn(conn)
        if len(result) == 0:
            raise Exception('No such user')
            return False
        if result[0][2] != sha_pass:
            raise Exception('Password error')
            return False
        self.id = result[0][0]
        self.admin = result[0][3]
        return True

    def remain_query(self, dep: str, arr: str, date: str, exact: int = 1):
        if exact:
            stmt = "select ti.seat_type, t.train_id, t.dep, t.arr, t.shown_code, t1.station, t2.station," \
                   "to_char(t.dep_time, 'HH24:MI'), to_char(t.arr_time, 'HH24:MI'), range / 60," \
                   "ip.price_yz, ip.price_rz, ip.price_sw, ip.price_yw, ip.price_rw," \
                   "remain_query(t.train_id, t.dep, t.arr, 1, %s), remain_query(t.train_id, t.dep, t.arr, 2, %s)," \
                   "remain_query(t.train_id, t.dep, t.arr, 3, %s), remain_query(t.train_id, t.dep, t.arr, 4, %s)," \
                   "remain_query(t.train_id, t.dep, t.arr, 5, %s)" \
                   "from ( " \
                   "    select t1.station_code dep_code, t2.station_code arr_code, t1.train_id train_id," \
                   "    t1.station_idx dep,t2.station_idx arr, t1.dep_time as dep_time, t2.arr_time as arr_time," \
                   "    t1.code_shown as shown_code, extract(epoch from (t2.arr_time - t1.dep_time + (t2.day_arr - t1.day_dep) * interval '1 day'))::int as range" \
                   "    from timetable t1 join timetable t2 on t1.train_id = t2.train_id where t1.station_code = %s and t2.station_code = %s and t1.station_idx < t2.station_idx ) t join train_info ti on t.train_id = ti.train_id join station_info t1 on t.dep_code = t1.code join station_info t2 on t.arr_code = t2.code join interval_price ip on t.train_id = ip.train_id and t.dep = ip.dep_idx and t.arr = ip.arr_idx order by t.range, t.dep_time;"
        else:
            stmt = "select ti.seat_type, t.train_id, t.dep, t.arr, t.shown_code, t1.station, t2.station," \
                   "to_char(t.dep_time, 'HH24:MI'), to_char(t.arr_time, 'HH24:MI'), range / 60," \
                   "ip.price_yz, ip.price_rz, ip.price_sw, ip.price_yw, ip.price_rw," \
                   "remain_query(t.train_id, t.dep, t.arr, 1, %s), remain_query(t.train_id, t.dep, t.arr, 2, %s)," \
                   "remain_query(t.train_id, t.dep, t.arr, 3, %s), remain_query(t.train_id, t.dep, t.arr, 4, %s)," \
                   "remain_query(t.train_id, t.dep, t.arr, 5, %s)" \
                   "from ( " \
                   "    select t1.station_code dep_code, t2.station_code arr_code, t1.train_id train_id," \
                   "    t1.station_idx dep,t2.station_idx arr, t1.dep_time as dep_time, t2.arr_time as arr_time," \
                   "    t1.code_shown as shown_code, extract(epoch from (t2.arr_time - t1.dep_time + (t2.day_arr - t1.day_dep) * interval '1 day'))::int as range" \
                   "    from timetable t1 join timetable t2 on t1.train_id = t2.train_id" \
                   "    where t1.station_code in (select code from station_info where city in (select city from station_info where code = %s))" \
                   "    and t2.station_code in (select code from station_info where city in (select city from station_info where code = %s))" \
                   "    and t1.station_idx < t2.station_idx ) t join train_info ti on t.train_id = ti.train_id join station_info t1 on t.dep_code = t1.code join station_info t2 on t.arr_code = t2.code join interval_price ip on t.train_id = ip.train_id and t.dep = ip.dep_idx and t.arr = ip.arr_idx order by t.range, t.dep_time;"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        cursor.execute(stmt, (date, date, date, date, date, dep, arr))
        result = cursor.fetchall()
        cursor.close()
        self.cp.putconn(conn)
        return result

    def price_query(self, train: str, dep: str, arr: str):
        stmt = 'select ti.seat_type, t1.code_shown, si1.station, si2.station, ip.* from interval_price ip join timetable t1 on ip.train_id = t1.train_id and ip.dep_idx = t1.station_idx join timetable t2 on ip.train_id = t2.train_id and ip.arr_idx = t2.station_idx join station_info si1 on t1.station_code = si1.code join station_info si2 on t2.station_code = si2.code join train_info ti on ip.train_id = ti.train_id where ip.train_id = %s and ip.dep_idx = %s and ip.arr_idx = %s'
        conn = self.cp.getconn()
        cursor = conn.cursor()
        cursor.execute(stmt, (train, dep, arr))
        result = cursor.fetchall()
        cursor.close()
        self.cp.putconn(conn)
        return result

    def passenger_info(self):
        stmt = "select passenger_id, passenger_name, idcard_number, phone_number from passenger_info where related_user = %s and shown = true;"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        cursor.execute(stmt, (self.id, ))
        self.passenger = cursor.fetchall()
        cursor.close()
        self.cp.putconn(conn)
        return self.passenger

    def purchase_ticket(self, train: int, dep: str, arr: str, date: str, hierarchy: int, passenger: int):
        stmt = "select * from passenger_info where passenger_id = %s and related_user = %s"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        cursor.execute(stmt, (passenger, self.id))
        result = cursor.fetchall()
        cursor.close()
        self.cp.putconn(conn)
        if len(result) != 1:
            raise Exception('No such privilege')
        stmt = "select purchase_order(%s, %s, %s, %s, %s, %s);"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        try:
            cursor.execute(stmt, (passenger, train, dep, arr, hierarchy, date))
        except Exception as e:
            cursor.close()
            self.cp.putconn(conn)
            return None
        order_no = cursor.fetchall()[0][0]
        stmt = "select to_char(si.dep_date, 'YYYY年MM月DD日'), si.seat_cabin, si.seat_code from order_info oi join seat_info si on oi.train_id = si.train_id and oi.seat_id = si.seat_no where order_id = %s;"
        cursor.execute(stmt, (order_no, ))
        res = cursor.fetchall()
        conn.commit()
        cursor.close()
        self.cp.putconn(conn)
        return list(res[0]) + [order_no]

    def refund_ticket(self, order_no: int):
        stmt = "select * from order_info where passenger_id in (select passenger_id from passenger_info where related_user = %s) and order_id = %s;"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        cursor.execute(stmt, (self.id, order_no))
        result = cursor.fetchall()
        cursor.close()
        self.cp.putconn(conn)
        if len(result) != 1:
            raise Exception('No such privilege')
        stmt = "select refund_order(%s);"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        try:
            cursor.execute(stmt, (order_no, ))
        except Exception as e:
            cursor.close()
            self.cp.putconn(conn)
            return False
        conn.commit()
        cursor.close()
        self.cp.putconn(conn)
        return True

    def timetable_query(self, train: str):
        stmt = "select coalesce(t.code_shown, ti.train_full_name) as number, (s.station || '(' || s.city || ')') as station, t.arr_time as arrive, t.dep_time as depart from timetable t  join station_info s on t.station_code = s.code  join train_info ti on t.train_id = ti.train_id  left join interval_price ip on t.train_id = ip.train_id and ip.dep_idx = 1 and ip.arr_idx = t.station_idx  where t.train_id in (      select distinct train_id from timetable      where code_shown like %s)  and t.station_idx >= 1  order by t.station_idx;"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        cursor.execute(stmt, (train, ))
        result = cursor.fetchall()
        cursor.close()
        self.cp.putconn(conn)
        return result

    def insert_passenger(self, name: str, idcard: str, phone: str):
        stmt = "insert into passenger_info (passenger_name, idcard_number, phone_number, related_user) values (%s, %s, %s, %s);"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        cursor.execute(stmt, (name, idcard, phone, self.id))
        cursor.fetchall()
        conn.commit()
        cursor.close()
        self.cp.putconn(conn)

    def delete_passenger(self, num: int):
        stmt = "update passenger_info set shown = false where passenger_id = %s and related_user = %s;"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        cursor.execute(stmt, (num, self.id))
        conn.commit()
        cursor.close()
        self.cp.putconn(conn)

    def order_query(self):
        stmt = "select * from order_info where passenger_id in (select passenger_id from passenger_info where related_user = %s);"
        conn = self.cp.getconn()
        cursor = conn.cursor()
        cursor.execute(stmt, (self.id, ))
        res = cursor.fetchall()
        conn.commit()
        cursor.close()
        return res

    def purchase_main(self):
        cnt: int = 0
        dep_sta = self.sta_get('出发站:')
        arr_sta = self.sta_get('到达站:')
        dep_date = input('出发日期(YYYY-MM-DD):')
        result = self.remain_query(dep_sta, arr_sta, dep_date)
        tb = PrettyTable(['序号', '车次', '出发站', '到达站', '发时', '到时', '历时', '二等/硬座', '一等/软座', '商务', '硬卧', '软卧'])
        tb.align['车次'] = 'l'
        for row in result:
            cnt += 1
            line = [cnt] + list(row[4:10])
            for h in range(0, 5):
                if row[h - 10] is not None:
                    line.append('{} / {}'.format(row[h - 10], row[h - 5]))
                else:
                    line.append('----')
            tb.add_row(line)
        tb.add_row(['0','EXIT'] + ['' for i in range(0, 10)])
        print(tb)
        idx = int(input('请选择购票车次的序号:'))
        while idx < 1 or idx > cnt:
            if idx == 0:
                return
            print('车次序号不合法!')
            idx = int(input('请选择购票车次的序号:'))
        else:
            hierarchy = int(input('请选择席别[1-5]:'))
            while hierarchy < 1 or hierarchy > 5:
                if idx == 0:
                    return
                print('席别序号不合法!')
                hierarchy = int(input('请选择席别[1-5]:'))
            pass_cnt = 0
            self.passenger_info()
            tb = PrettyTable(['序号', '姓名', '身份证号', '手机号'])
            for row in self.passenger:
                pass_cnt += 1
                tb.add_row([str(pass_cnt)] + [str(x) for x in row[1:]])
            print(tb)
            passenger = int(input('请选择乘车人序号:')) - 1
            while passenger < 0 or passenger >= pass_cnt:
                if passenger == -1:
                    return
                print('乘车人序号不合法!')
                passenger = int(input('请选择乘车人序号:')) - 1
            row = result[idx - 1]
            res = self.purchase_ticket(row[1], row[2], row[3], dep_date, hierarchy, self.passenger[passenger][0])
            if res is None:
                input('余票不足，购票失败')
            else:
                if row[0] == True:
                    seatname = ['二等座', '一等座', '商务座', '', '']
                else:
                    seatname = ['硬座', '软座', '', '硬卧', '软卧']
                print('购票成功, {}成功购买{}{}次{}车票, 座位号{}车{}号!'.format(self.passenger[passenger][1], res[0], row[4], seatname[hierarchy - 1], res[1], res[2]))
                complete = input('请支付{}元,是否支付成功[Y/N]:'.format(row[hierarchy - 11]))
                if complete.lower() == 'y':
                    input('完成购票, 订单号{}'.format(res[3]))
                    return
                else:
                    self.refund_ticket(res[3])
                    input('取消购票成功')
                    return

    def timetable_main(self):
        train = input('请输入车次:')
        res = self.timetable_query(train)
        tb = PrettyTable(['车次', '车站', '到达时刻', '出发时刻'])
        for row in res:
            tb.add_row([x if x is not None else '--:--:--' for x in row])
        input(tb)

    def passenger_manage_main(self):
        while True:
            self.passenger_info()
            pass_cnt = 0
            tb = PrettyTable(['序号', '姓名', '身份证号', '手机号'])
            for row in self.passenger:
                pass_cnt += 1
                tb.add_row([pass_cnt] + list(row[1:]))
            print(tb)
            ch = input('1.新增乘车人\t2.删除乘车人\t0.退出:')
            if ch == '1':
                name = input('乘车人姓名:')
                idcard = input('身份证号:')
                phone = input('手机号码:')
                try:
                    self.insert_passenger(name, idcard, phone)
                except Exception as e:
                    print('添加成功!')
            elif ch == '2':
                num = int(input('请选择被删除的乘车人序号:')) - 1
                while num < 0 or num >= pass_cnt:
                    if num == -1:
                        return
                    print('序号不合法!')
                    num = int(input('请选择被删除的乘车人序号:')) - 1
                try:
                    self.delete_passenger(self.passenger[num][0])
                except Exception as e:
                    print('删除成功!')
            elif ch == '0':
                return

    def order_manage_main(self):
        pass

    def sta_get(self, nm: str):
        while True:
            sta = input(nm)
            stmt = "select si.code, si.station, cp.province||si.city from station_info si join city_province cp on si.city = cp.city where si.station like '{}%';".format(
                sta)
            conn = self.cp.getconn()
            cursor = conn.cursor()
            cursor.execute(stmt)
            result = cursor.fetchall()
            cursor.close()
            self.cp.putconn(conn)
            tb = PrettyTable(['序号', '车站名', '城市'])
            cnt = 0
            for row in result:
                cnt += 1
                tb.add_row([cnt] + list(row[1:]))
            tb.add_row(['0', '重新输入', ''])
            print(tb)
            num = int(input('请选择车站序号:'))
            if num != 0:
                return result[num - 1][0]

    def welcome(self):
        while True:
            if self.admin == False:
                tb = PrettyTable(['1', '2', '3', '4', '0'])
                tb.add_row(['查询购票', '时刻查询', '乘车人管理', '订单管理', '退出系统'])
                print(tb)
                res = int(input('请选择服务功能:'))
                if res == 0:
                    return
                if res == 1:
                    self.purchase_main()
                if res == 2:
                    self.timetable_main()
                if res == 3:
                    self.passenger_manage_main()
                if res == 4:
                    self.order_manage_main()
            else:
                tb = PrettyTable(['1', '0'])
                tb.add_row(['用户管理', '退出系统'])
                print(tb)
                res = int(input('请选择服务功能:'))
                if res == 0:
                    return


if __name__ == '__main__':
    user = Service('admin', '123456')
    user.welcome()
