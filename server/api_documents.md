## 12307-API 格式

上线api: *login, query, price, passenger*

#### login

```
GET api/login
username: str
password: str
```

提供username和password（明文），返回token。

若errcode为0，则登陆成功；若errcode为1，则登陆失败，提示errmsg。若privilege为1，则具有管理员权限。

```json
GET /api/login?username=admin&password=123456
{
  "errcode": 0,
  "errmsg": "",
  "token" : "123456",
  "privilege": 1
}
```

```json
GET /api/login?username=admin123&password=123456
{
  "errcode": 1,
  "errmsg": "No such user",
  "token" : "",
  "privilege": -1
}
```

#### logout

```
GET api/logout
```

登出当前账户。

```json
GET /api/logout
{
  "errcode": 0,
  "errmsg": ""
}
```

```json
GET /api/logout
{
  "errcode": 1,
  "errmsg": "token invalid"
}
```

#### status

```
GET api/status
```

判断当前是否有账户登陆。errcode为0则登陆，否则未登录。

```json
GET /api/status
{
  "errcode": 0,
  "errmsg": ""
}
```

```json
GET /api/status
{
  "errcode": 1,
  "errmsg": "token invalid"
}
```

#### signup

```
GET api/signup
username: str
password: str
```

提供username和password，进行账户注册。

```json
GET /api/signup?username=wtd2&password=123456
{
  "errcode": 0,
  "errmsg": ""
}
```

```json
GET /api/signup?username=admin&password=123456
{
  "errcode": 1,
  "errmsg": "User exists"
}
```

#### query

```
GET api/query
dep: str
arr: str
date: str, format(YYYYMMDD)
exact: int (0 or 1)
```

提供出发车站和到达车站对应代码（三位大写字母），出发日期（按照YYYYMMDD格式），精确查询（0按城市查询，1按车站查询），token。

返回余票查询结果，其中train_id, dep_idx, arr_idx用来完成后续购票的交互。提供硬座/二等座，软座/一等座，商务座，硬卧，软卧的票价和余票，若该座位不存在返回-1。

```json
GET /api/query?dep=WAR&arr=SHH&date=20200515&exact=1
{
  "errcode": 0,
  "errmsg": "",
  "result_cnt": 1,
  "result": [
    {
      "train_id": 1234,
      "dep_idx": 1,
      "arr_idx": 20,
      "train_num": "Z42",
      "dep_station": "乌鲁木齐",
      "arr_station": "上海",
      "dep_time": "19:31",
      "arr_time": "11:59",
      "total_time": 2428,
      "ticket_yz": 0,
      "price_yz": 385.5,
      "ticket_rz": 0,
      "price_rz": 615.5,
      "ticket_sw": -1,
      "price_sw": -1,
      "ticket_yw": 0,
      "price_yw": 695.5,
      "ticket_rw": 0,
      "price_rw": 1075.5
    }
  ]
}
```

#### transfer

```
GET api/transfer
dep: str
arr: str
exact: int (0 or 1)
```

类似余票查询，查询两站（或两地）间中转路线。

```json
GET /api/query?dep=WAR&arr=ENH&exact=1
{
  "errcode": 0,
  "errmsg": "",
  "result_cnt": 1,
  "result": [
    {
      "first_train": "Z42",
      "second_train": "G7252",
      "dep_station": "乌鲁木齐",
      "via_station": "上海",
      "arr_station": "合肥南",
      "first_dep_time": "19:31",
      "first_arr_time": "11:59",
      "first_dep_time": "15:44",
      "first_arr_time": "17:52",
      "total_time": 2781,
      "transfer_time": 225
    }
  ]
}
```

####price

````
GET api/price
train_id: int
dep_idx: int
arr_idx: int
````

提供train_id, dep_idx, arr_idx, token, 返回座位种类和票价信息。

```json
GET /api/price?train_id=1234&dep_idx=1&arr_idx=20
{
  "errcode": 0,
  "errmsg": "",
  "train_num": "Z42",
  "dep_station": "乌鲁木齐",
  "arr_station": "上海",
  "result_cnt": 4,
  "result": [
    {
      "type_id": 1,
      "type_name": "硬座",
      "price": 385.5
    },
    {
      "type_id": 2,
      "type_name": "软座",
      "price": 615.5
    },
    {
      "type_id": 4,
      "type_name": "硬卧",
      "price": 695.5
    },
    {
      "type_id": 5,
      "type_name": "软卧",
      "price": 1075.5
    }
  ]
}
```

#### passenger

````
GET api/passenger
````

提供token，返回账户对应乘车人。

```json
GET /api/passenger
{
  "errcode": 0,
  "errmsg": "",
  "result_cnt": 2,
  "result": [
    {
      "id": 1,
      "name": "张三",
      "idcard": "11010119260817001X",
      "phone": "13800138000"
    },
    {
      "id": 3,
      "name": "李四",
      "idcard": "110101192608170123",
      "phone": "13800138001"
    }
  ]
}
```

#### orderlist

````
GET api/orderlist
````

提供token，返回账户对应订单。

```json
GET /api/orderlist
{
  "errcode": 0,
  "errmsg": "",
  "result_cnt": 1,
  "result": [
    {
      "order_id": 30,
      "passenger_name": "张三",
      "train_num": "Z42",
      "dep_station": "乌鲁木齐",
      "arr_station": "上海",
      "seat_no": "1车001号",
      "seat_type": "硬座",
      "seat_price": 385.5,
      "purchase_time": "2020-05-14 12:56",
      "dep_time": "2020-05-15 19:31",
      "arr_time": "2020-05-17 11:59"
    }
  ]
}
```

#### purchase

```
GET api/purchase
train_id: int
dep_idx: int
arr_idx: int
date: str, format(YYYYMMDD)
type_id: int
passenger_id: int
```

提供购票各项参数，dep_idx, arr_idx, train_id在query中提供，type_id为price中的type_id，passenger_id为passenger中的id，购买车票。

```json
GET /api/purchase?train_id=1234&dep_idx=1&arr_idx=20&date=20200516&type_id=1&passenger_id=1
{
  "errcode": 0,
  "errmsg": "",
  "seat_no": "1车001号",
  "order_id": 30
}
```

```json
GET /api/purchase?train_id=1234&dep_idx=1&arr_idx=20&date=20200515&type_id=1&passenger_id=1
{
  "errcode": 1,
  "errmsg": "余票不足",
  "seat_no": "",
  "order_id": -1
}
```

#### refund

```
GET api/refund
order_id: int
```

提供订单号和token，完成退票。

```json
GET /api/refund?order_id=30
{
  "errcode": 0,
  "errmsg": ""
}
```

```json
GET /api/refund?order_id=29
{
  "errcode": 1,
  "errmsg": "无对应订单"
}
```

#### addpassenger

```
GET api/addpassenger
name: str
idcard: str
phone: str
```

提供信息，添加乘车人。

```json
GET /api/addpassenger?name=张三&idcard=11010119260817001X&phone=13800138000
{
  "errcode": 0,
  "errmsg": ""
}
```

```json
GET /api/addpassenger?name=张三&idcard=11010119260817001X&phone=13800138000
{
  "errcode": 1,
  "errmsg": "乘车人已存在"
}
```

#### deletepassenger

```
GET api/deletepassenger
passenger_id: int
```

提供乘车人编号(在passenger中提供)和token，删除乘车人。

```json
GET /api/deletepassenger?passenger_id=1
{
  "errcode": 0,
  "errmsg": ""
}
```

```json
GET /api/deletepassenger?passenger_id=2
{
  "errcode": 1,
  "errmsg": "无权限"
}
```