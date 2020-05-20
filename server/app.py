from cli import Service
from flask import *
from flask_api import FlaskAPI, status
import secrets
from gevent.pywsgi import WSGIServer
from gevent import monkey

app = FlaskAPI(__name__)

uuid = {}


def price_auth(x, y):
    if x is None:
        return -1, -1, 0
    return x, y, y


@app.route("/api/login", methods=['GET', 'POST'])
def login():
    res = {
        'errcode': 0,
        'errmsg': '',
        'token': '',
        'privilege': 0
    }
    try:
        username = request.args.get('username')
        password = request.args.get('password')
        s = Service(username, password)
        res['privilege'] = int(s.admin)
        token = secrets.token_hex(20)
        while token in uuid:
            token = secrets.token_hex(20)
        res['token'] = token
        uuid[token] = s
    except Exception as e:
        res['errcode'] = 1
        res['errmsg'] = str(e)
        res['privilege'] = -1
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    cookie = {'Set-Cookie': '12307_token={}; Path=/api/'.format(res['token'])}
    return res, cookie, status.HTTP_200_OK


@app.route("/api/logout", methods=['GET', 'POST'])
def logout():
    try:
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('token invalid {}'.format(token))
        uuid.pop(token)
        errcode = 0
        errmsg = ''
    except Exception as e:
        errcode = 1
        errmsg = str(e)
    finally:
        cookie = {'Set-Cookie': '12307_token=deleted; Path=/api/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'}
    res = {
        'errcode': errcode,
        'errmsg': errmsg
    }
    if errcode == 1:
        return res, cookie, status.HTTP_401_UNAUTHORIZED
    return res, cookie, status.HTTP_200_OK


@app.route("/api/status", methods=['GET', 'POST'])
def login_status():
    try:
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('token invalid {}'.format(token))
        admin = int(uuid[token].admin)
        errcode = 0
        errmsg = ''
    except Exception as e:
        admin = -1
        errcode = 1
        errmsg = str(e)
    res = {
        'privilege': admin,
        'errcode': errcode,
        'errmsg': errmsg
    }
    if errcode == 1:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/station", methods=['GET', 'POST'])
def station():
    try:
        token = request.cookies.get('12307_token')
        result = []
        if token not in uuid:
            raise Exception('Unauthorized')
        s = uuid[token]
        q = s.station_list()
        for row in q:
            result.append({'code': row[0], 'station': row[1], 'city': row[2], 'province': row[3]})
        errcode = 0
        errmsg = ''
    except Exception as e:
        result = []
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg,
        'result_cnt': len(result),
        'result': result
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/timetable", methods=['GET', 'POST'])
def timetable():
    try:
        code = request.args.get('train_code')
        token = request.cookies.get('12307_token')
        result = []
        if token not in uuid:
            raise Exception('Unauthorized')
        s = uuid[token]
        q = s.timetable_query(code)
        for row in q:
            cur = {
                'station_idx': row[0],
                'arr_time': row[3] if row[3] is not None else '--:--',
                'dep_time': row[4] if row[4] is not None else '--:--',
                'arr_day': row[5] if row[5] is not None else row[6],
                'dep_day': row[6] if row[6] is not None else row[5],
                'duration': int(row[7]) if row[7] is not None else -1,
                'station': row[2],
                'code': row[1],
                'train_id': row[8]
            }
            result.append(cur)
        errcode = 0
        errmsg = ''
    except Exception as e:
        result = []
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg,
        'result_cnt': len(result),
        'result': result
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/query", methods=['GET', 'POST'])
def query():
    try:
        dep = request.args.get('dep')
        arr = request.args.get('arr')
        date = request.args.get('date')
        exact = int(request.args.get('exact'))
        token = request.cookies.get('12307_token')
        result = []
        if token not in uuid:
            raise Exception('Unauthorized')
        s = uuid[token]
        q = s.remain_query(dep, arr, date, exact)
        for row in q:
            remain = 0
            for i in range(10, 15):
                remain += price_auth(row[i], row[i + 5])[2]
            pr = 1e9
            for i in range(10, 15):
                if row[i] is not None:
                    pr = min(pr, row[i])
            cur = {'train_id': row[1], 'dep_idx': row[2], 'arr_idx': row[3], 'train_num': row[4], 'dep_station': row[5],
                   'arr_station': row[6], 'dep_time': row[7], 'arr_time': row[8], 'total_time': row[9], 'remain': remain,
                   'price_yz': price_auth(row[10], row[15])[0], 'ticket_yz': price_auth(row[10], row[15])[1],
                   'price_rz': price_auth(row[11], row[16])[0], 'ticket_rz': price_auth(row[11], row[16])[1],
                   'price_sw': price_auth(row[12], row[17])[0], 'ticket_sw': price_auth(row[12], row[17])[1],
                   'price_yw': price_auth(row[13], row[18])[0], 'ticket_yw': price_auth(row[13], row[18])[1],
                   'price_rw': price_auth(row[14], row[19])[0], 'ticket_rw': price_auth(row[14], row[19])[1],
                   'price': pr
                   }
            result.append(cur)
        errcode = 0
        errmsg = ''
    except Exception as e:
        result = []
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg,
        'result_cnt': len(result),
        'result': result
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/transfer", methods=['GET', 'POST'])
def transfer():
    try:
        dep = request.args.get('dep')
        arr = request.args.get('arr')
        exact = int(request.args.get('exact'))
        token = request.cookies.get('12307_token')
        result = []
        if token not in uuid:
            raise Exception('Unauthorized')
        s = uuid[token]
        q = s.transfer_query(dep, arr, exact)
        for row in q:
            cur = {
                'first_train': row[2],
                'second_train': row[6],
                'dep_station': row[0],
                'via_station': row[4],
                'arr_station': row[8],
                'first_dep_time': row[1],
                'first_arr_time': row[3],
                'second_dep_time': row[5],
                'second_arr_time': row[7],
                'total_time': row[9],
                'transfer_time': row[10]
            }
            result.append(cur)
        errcode = 0
        errmsg = ''
    except Exception as e:
        result = []
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg,
        'result_cnt': len(result),
        'result': result
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/price", methods=['GET', 'POST'])
def price():
    train_no = ''
    dep_sta = ''
    arr_sta = ''
    try:
        seat = [['二等座', '一等座', '商务座', '硬卧', '软卧'], ['硬座', '软座', '商务座', '硬卧', '软卧']]
        train = request.args.get('train_id')
        dep = request.args.get('dep_idx')
        arr = request.args.get('arr_idx')
        date = request.args.get('date')
        token = request.cookies.get('12307_token')
        result = []
        if token not in uuid:
            raise Exception('Unauthorized')
        s = uuid[token]
        q = s.price_query(train, dep, arr, date)
        ch = 0 if q[0] else 1
        train_no = q[1]
        dep_sta = q[2]
        arr_sta = q[3]
        for i in range(0, 5):
            if q[7 + i] is None:
                continue
            result.append({'type_id': i + 1, 'type_name': seat[ch][i], 'price': q[7 + i], 'ticket': q[12 + i]})
        errcode = 0
        errmsg = ''

    except Exception as e:
        result = []
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg,
        'train_num': train_no,
        'dep_station': dep_sta,
        'arr_station': arr_sta,
        'result_cnt': len(result),
        'result': result
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/passenger", methods=['GET', 'POST'])
def passenger():
    try:
        token = request.cookies.get('12307_token')
        result = []
        if token not in uuid:
            raise Exception('Unauthorized')
        s = uuid[token]
        q = s.passenger_info()
        for row in q:
            result.append({'id': row[0], 'name': row[1], 'idcard': row[2], 'phone': row[3]})
        errcode = 0
        errmsg = ''
    except Exception as e:
        result = []
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg,
        'result_cnt': len(result),
        'result': result
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/orderlist", methods=['GET', 'POST'])
def order():
    try:
        seat = [['二等座', '一等座', '商务座', '硬卧', '软卧'], ['硬座', '软座', '商务座', '硬卧', '软卧']]
        token = request.cookies.get('12307_token')
        result = []
        if token not in uuid:
            raise Exception('Unauthorized')
        s = uuid[token]
        q = s.order_query()
        for row in q:
            ch = 0 if row[12] else 1
            result.append({
                'order_id': row[0],
                'passenger_name': row[2],
                'passenger_idcard': row[13],
                'train_num': row[1],
                'dep_station': row[3],
                'arr_station': row[4],
                'seat_no': str(row[8]) + '车' + row[9] + '号',
                'seat_price': row[5],
                'seat_type': seat[ch][row[7] - 1],
                'purchase_time': row[6],
                'dep_time': row[10],
                'arr_time': row[11],
            })
        errcode = 0
        errmsg = ''
    except Exception as e:
        result = []
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg,
        'result_cnt': len(result),
        'result': result
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/purchase", methods=['GET', 'POST'])
def purchase():
    try:
        train = request.args.get('train_id')
        dep = request.args.get('dep_idx')
        arr = request.args.get('arr_idx')
        date = request.args.get('date')
        type = request.args.get('type_id')
        passen = request.args.get('passenger_id')
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('Unauthorized')
        s = uuid[token]
        q = s.purchase_ticket(train, dep, arr, date, type, passen)
        orderid = q[3]
        seatno = str(str(q[1]) + '车' + q[2] + '号')
        errcode = 0
        errmsg = ''

    except Exception as e:
        errcode = 1
        errmsg = str(e)
        seatno = ''
        orderid = -1
    res = {
        'errcode': errcode,
        'errmsg': errmsg,
        'seat_no': seatno,
        'order_id': orderid
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/refund", methods=['GET', 'POST'])
def refund():
    try:
        orderid = request.args.get('order_id')
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('Unauthorized')
        s = uuid[token]
        q = s.refund_ticket(orderid)
        errcode = 0
        errmsg = ''

    except Exception as e:
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/addpassenger", methods=['GET', 'POST'])
def add_passenger():
    try:
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('Unauthorized')
        name = request.args.get('name')
        card = request.args.get('idcard')
        phone = request.args.get('phone')
        s = uuid[token]
        s.insert_passenger(name, card, phone)
        errcode = 0
        errmsg = ''

    except Exception as e:
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/editpassenger", methods=['GET', 'POST'])
def modify_passenger():
    try:
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('Unauthorized')
        pid = request.args.get('id')
        name = request.args.get('name')
        card = request.args.get('idcard')
        phone = request.args.get('phone')
        s = uuid[token]
        s.update_passenger(pid, name, card, phone)
        errcode = 0
        errmsg = ''

    except Exception as e:
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/deletepassenger", methods=['GET', 'POST'])
def delete_passenger():
    try:
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('Unauthorized')
        pid = request.args.get('passenger_id')
        s = uuid[token]
        s.delete_passenger(pid)
        errcode = 0
        errmsg = ''

    except Exception as e:
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/register", methods=['GET', 'POST'])
def register():
    try:
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('Unauthorized')
        if not uuid[token].admin:
            raise Exception('No such privilege')
        user = request.args.get('username')
        password = request.args.get('password')
        s = uuid[token]
        s.register(user, bytes(password, encoding='utf8'))
        errcode = 0
        errmsg = ''

    except Exception as e:
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/addstop", methods=['GET', 'POST'])
def add_stop():
    try:
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('Unauthorized')
        if not uuid[token].admin:
            raise Exception('No such privilege')
        tid = request.args.get('train_id')
        code = request.args.get('station_code')
        if 'dep_time' not in request.args:
            dep_time = None
        else:
            dt = int(request.args.get('dep_time'))
            dep_time = '{}:{}'.format(dt // 60, dt % 60)
        if 'arr_time' not in request.args:
            arr_time = None
        else:
            at = int(request.args.get('arr_time'))
            arr_time = '{}:{}'.format(at // 60, at % 60)
        dep_day = request.args.get('dep_day') if 'dep_day' in request.args else None
        arr_day = request.args.get('arr_day') if 'arr_day' in request.args else None
        s = uuid[token]
        s.add_stop(tid, code, dep_time, arr_time, dep_day, arr_day)
        errcode = 0
        errmsg = ''

    except Exception as e:
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/editstop", methods=['GET', 'POST'])
def edit_stop():
    try:
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('Unauthorized')
        if not uuid[token].admin:
            raise Exception('No such privilege')
        tid = request.args.get('train_id')
        code = request.args.get('station_code')
        idx = request.args.get('station_idx')
        if 'dep_time' not in request.args:
            dep_time = None
        else:
            dt = int(request.args.get('dep_time'))
            dep_time = '{}:{}'.format(dt // 60, dt % 60)
        if 'arr_time' not in request.args:
            arr_time = None
        else:
            at = int(request.args.get('arr_time'))
            arr_time = '{}:{}'.format(at // 60, at % 60)
        dep_day = request.args.get('dep_day') if 'dep_day' in request.args else None
        arr_day = request.args.get('arr_day') if 'arr_day' in request.args else None
        s = uuid[token]
        s.edit_stop(tid, idx, code, dep_time, arr_time, dep_day, arr_day)
        errcode = 0
        errmsg = ''

    except Exception as e:
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK


@app.route("/api/removestop", methods=['GET', 'POST'])
def remove_stop():
    try:
        token = request.cookies.get('12307_token')
        if token not in uuid:
            raise Exception('Unauthorized')
        if not uuid[token].admin:
            raise Exception('No such privilege')
        tid = request.args.get('train_id')
        idx = request.args.get('station_idx')
        s = uuid[token]
        s.remove_stop(tid, idx)
        errcode = 0
        errmsg = ''

    except Exception as e:
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg
    }
    if res['errcode']:
        return res, status.HTTP_401_UNAUTHORIZED
    return res, status.HTTP_200_OK



if __name__ == '__main__':
    monkey.patch_all()
    server = WSGIServer(('0.0.0.0', 1234), app)
    server.serve_forever()
    # app.run(host='0.0.0.0', port = '1234', debug= True)
