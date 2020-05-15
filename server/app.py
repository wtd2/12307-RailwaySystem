from cli import *
from flask import *
from flask_api import FlaskAPI, status
import secrets

app = FlaskAPI(__name__)

uuid = {}


def price_auth(x, y):
    if x is None:
        return -1, -1
    return x, y


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
        errcode = 0
        errmsg = ''
    except Exception as e:
        errcode = 1
        errmsg = str(e)
    res = {
        'errcode': errcode,
        'errmsg': errmsg
    }
    if errcode == 1:
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
            cur = {'train_id': row[1], 'dep_idx': row[2], 'arr_idx': row[3], 'train_num': row[4], 'dep_station': row[5],
                   'arr_station': row[6], 'dep_time': row[7], 'arr_time': row[8], 'total_time': row[9],
                   'price_yz': price_auth(row[10], row[15])[0], 'ticket_yz': price_auth(row[10], row[15])[1],
                   'price_rz': price_auth(row[11], row[16])[0], 'ticket_rz': price_auth(row[11], row[16])[1],
                   'price_sw': price_auth(row[12], row[17])[0], 'ticket_sw': price_auth(row[12], row[17])[1],
                   'price_yw': price_auth(row[13], row[18])[0], 'ticket_yw': price_auth(row[13], row[18])[1],
                   'price_rw': price_auth(row[14], row[19])[0], 'ticket_rw': price_auth(row[14], row[19])[1]}
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
        token = request.cookies.get('12307_token')
        result = []
        if token not in uuid:
            raise Exception('Unauthorized')
        s = uuid[token]
        q = s.price_query(train, dep, arr)
        ch = 0 if q[0][0] else 1
        train_no = q[0][1]
        dep_sta = q[0][2]
        arr_sta = q[0][3]
        for i in range(0, 4):
            if q[0][7 + i] is None:
                continue
            result.append({'type_id': i + 1, 'type_name': seat[ch][i], 'price': q[0][7 + i]})
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






if __name__ == '__main__':
    db = Service('', '', public = True)
    app.run(host='0.0.0.0', port = '1234', debug= True)
