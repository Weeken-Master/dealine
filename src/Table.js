import React, { useEffect, useState } from 'react';
import { Input, Button, Row, List, Container, ListGroupItem, Badge } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, ListInlineItem, Col } from 'reactstrap';
// import Avatar from "@mui/material/Avatar";
import axios from "axios"
import Example from './Modal';
import Treedm from './components/DanhMuc/Treedm';
import "./tb.css"
import { DataGrid } from '@mui/x-data-grid';
import { maxHeight, maxWidth } from '@mui/system';
import { Divider,Radio,Table } from 'antd';

function TableData(){
    
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
            title: "Image",
            dataIndex: "ImageURL", 
            width: 50,
            maxWidth: 50, 
            render: theImageURL => <img alt={theImageURL} src={theImageURL}  style={{width:50, height:50}}/> 
             // 'theImageURL' is the variable you must declare in order the render the URL
        },
        {
          title: 'Ratings',
          dataIndex: 'rating',
          render: (Number) => <a>{Number}</a>,
        },
        {
            title: 'shop_location',
            dataIndex: 'shop_location',
            render: (text) => <a>{text}</a>,
          },
        { 
            title: 'liked_count',
            dataIndex:'liked_count',

        
        },
        {
            title:'price_min',
            dataIndex:'price_min',
            return:(Number)=> <>{Number} VNĐ</>
        },
        {
            title:'price_max',
            dataIndex:'price_max',
            return:(Number)=> <>{Number} VNĐ</>
        },
        {
            title:'is_official_shop',
            dataIndex:'is_official_shop',
            return:(text) =><> {text}</>
        },
        {
            title: 'Button Test',
            key: 'chi_tiet',
            dataIndex: 'chi_tiet',
            render: (Button, shop_id,item_id) => (
            <button onClick={()=>getInfoItem(shop_id,item_id) }    style={{background:"green", color:"white"}} >
            {"Chi tiết"}
            </button>
            ),
        }



      ];
      const data = [
        // {
        //   key: '1',
        //   name: 'John Brown',
        //   
        // },
       
    ];

    const [datarow,setdatarow] = useState([]) 
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //  datarow.push('data', selectedRows)
            setdatarow( (`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows))
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };


    const [selectionType, setSelectionType] = useState('checkbox');


    const [items, setItems] = useState([])
    const [checki, setchecki] =useState(false)

    const [key, setKey] = useState("laptop")
    const [link, setLink] = useState("")

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [infoItem, setInfoItem] = useState({
        "ratings" : [],
        "rating" : 0
    })
    const [infoShop, setInfoShop] = useState({})
   
    function getItems(){
        axios.get(' http://14.225.44.83:5000/search/'+key)
          .then(function (response) {
            setItems(response.data)
            setchecki(true)

          })
          .catch(function (error) {
            console.log(error)
          })
    }
    // console.log(items)

    items.forEach(function(element, index){
            data.push({"key": index +1, "name": element.name, "ImageURL":element.image, "rating":element.rating.toFixed(2),"shop_location":element.shop_location, "liked_count": element.liked_count,
            "price_min":(element.price_min),
            "price_max":(element.price_max),
            "is_official_shop": element.is_official_shop === true ? <b>&#9989;</b>: <b>&#10060;</b>,
            "chi_tiet":(element.shopid, element.itemid),
            },
            
            )})

    function getItemsLink(){
        axios.get('http://127.0.0.1:5000/info?url='+link)
        .then(function (response) {
            setModal(!modal)
            // setInfoItem({})
            setInfoItem(response.data.item)
            // setInfoShop(response.data.shop)
            console.log(response.data.item)
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    function getInfoItem(shop_id, item_id){
        setModal(!modal)
        axios.get('http://127.0.0.1:5000/info_item?shop_id='+shop_id+'&item_id='+item_id)
          .then(function (response) {
            // setInfoItem({})
            
            setInfoItem(response.data.item)
            console.log(response.data.item)
            // setInfoShop(response.data.shop)
          })
          .catch(function (error) {
            console.log(error)
          })
    }
 
    return(
    <>
    <Container>
        <br/>
        <Row>
            <Input placeholder="Nhập tên sản phẩm cần tìm" onChange={(e)=>setKey(e.target.value)}/>
            <Button color="success" onClick={getItems}>
            Tìm kiếm
            </Button>
        </Row>
        <hr/>

        <br/>
        <Row>
            <Input placeholder="Tìm kiếm theo link" onChange={(e)=>setLink(e.target.value)}/>
            <Button color="success" onClick={getItemsLink}>
            Tìm kiếm
            </Button>
        </Row>
        <hr/>

        <div className='hic'>
        <div>
         {checki === false? "":<Treedm {...datarow}/>}
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>

      
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>

   
  {/* <table  id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0">
    <tr>
      <th>STT</th>
      <th >Image</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Points</th>
      <th>Tên sản phẩm</th>
    </tr>

    {
        items.map((value, index) =>   
    <tr>
      <td>{index + 1}</td>
    
      <td><img height={100} width={100} src={value.image}/></td>
      <td> {value.rating.toFixed(2)}</td>
      <td>{value.liked_count}</td>
      <td>{value.historical_sold}</td>
      <td>{Intl.NumberFormat().format(value.price_min)} - {Intl.NumberFormat().format(value.price_max)} VNĐ</td>
      <td>{value.shop_location}</td>
      <td>{value.is_official_shop === true ? <b>&#9989;</b>: <b>&#10060;</b>}</td>
      <td>{value.stock}</td>
      <td><Button color="success" onClick={() => {getInfoItem(value.shopid, value.itemid)}} style={{background:"green", color:"white"}}>
                                Xem
            </Button></td>
      <td>
                <Treedm {...value}/>
             </td>
               <td  style={{fontSize:"0.7rem"}}> {value.name} </td>
    </tr>
      )
    }
  </table>
 */}

    
     
     
        </div>
        {/* <Row>
            <Table>
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Tên Sản Phẩm
                    </th>
                    <th>
                        Hình Ảnh
                    </th>
                    <th>&#9733;</th>
                    <th>&#xe006;</th>
                    <th>Đã Bán</th>
                    <th>Giá</th>
                    <th>Địa Chỉ</th>
                    <th>SHOP MALL</th>
                    <th>Còn Lại</th>
                    <th>Thêm vào</th>
                    <td>Chi Tiết</td>
                </tr>
            </thead>

            <tbody>
                {
                    items.map((value, index) =>
                        <tr>
                            <th scope="row">
                                {index + 1}
                            </th>
                        <td>
                            {value.name}
                        </td>
                        <td>
                            <img height={100} width={100} src={value.image}/>
                        </td>
                        <td>
                            {value.rating.toFixed(2)}
                        </td>
                        <td>
                        {value.liked_count}
                        </td>
                        <td>{value.historical_sold}</td>
                        <td>{Intl.NumberFormat().format(value.price_min)} - {Intl.NumberFormat().format(value.price_max)} VNĐ</td>
                        <td>{value.shop_location}</td>
                        <td>{value.is_official_shop == true ? <b>&#9989;</b>: <b>&#10060;</b>}</td>
                        <td>{value.stock}</td>
                        <td>
                            <Treedm  />
                        </td>
                        <td>
                            <Button color="success" onClick={() => {getInfoItem(value.shopid, value.itemid)}}>
                                Xem
                            </Button>
                        </td>
                    </tr>
                    )
                }
        </tbody>
      </Table>
      </Row> */}
    

      </Container>
              <div>
              <Modal isOpen={modal} toggle={toggle} size="xl">
              <ModalHeader toggle={toggle}>{infoItem.name}</ModalHeader>
              <ModalBody>
                <List type="inline">
                    <ListInlineItem>
                    {Intl.NumberFormat().format(infoItem.price_min)} - {Intl.NumberFormat().format(infoItem.price_max)} VNĐ
                    </ListInlineItem>
                </List>
                <Example attributes={infoItem.attributes} description={infoItem.description}/>
                
                <br/>
                <List type="inline">
                    <li>Đã Bán: {infoItem.historical_sold}</li>
                </List>

                <hr></hr>
                
                <ListGroupItem className="justify-content-between">
                    <Row>
                        <Col xs="2">
                        Tất Cả 
                        <Badge pill>
                            {(infoItem.rating).toFixed(2)}
                        </Badge>
                        </Col>
                        <Col xs="2">
                        5 Sao
                        <Badge pill>
                            {infoItem.ratings[0]}
                        </Badge>
                        </Col>
                        <Col xs="2">
                        4 Sao
                        <Badge pill>
                            {infoItem.ratings[1]}
                        </Badge>
                        </Col>
                        <Col xs="2">
                        3 Sao
                        <Badge pill>
                            {infoItem.ratings[2]}
                        </Badge>
                        </Col>
                        <Col xs="2">
                        2 Sao
                        <Badge pill>
                            {infoItem.ratings[3]}
                        </Badge>
                        </Col>
                        <Col xs="2">
                        1 Sao
                        <Badge pill>
                            {infoItem.ratings[4]}
                        </Badge>
                        </Col>
                    </Row>
                </ListGroupItem>

                
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={toggle}>
                  Do Something
                  </Button>{' '}
                  <Button color="secondary" onClick={toggle}>
                  Cancel
                  </Button>
              </ModalFooter>
              </Modal>
          </div>
          </>

    )
}
export default TableData;