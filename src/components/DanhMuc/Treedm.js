import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { Cascader } from "antd";

import Modal from 'react-bootstrap/Modal';
function Treedm(props) {
  const options = [
    
    {
      value: "Thời trang nam",
      label: "Thời Trang Nam",
      children: [
        {
          value: "Áo khoác",
          label: "Áo khoác",
          children: [
            {
              value: "Áo hodie",
              label: "Áo hodie",
              children: [
                {
                  value: "c2",
                  label: "c2"
                },
              {
                label: 'áo hidoe2',
                value: 'áo hidoe2',
              }
              ]
            },
          ],
        },{

          value: "Áo b",
          label: "Áo b",
          children: [
            {
              value: "zhonghuamen2",
              label: "Zhong Hua Men2",
              children: [
                {
                  value: "c2",
                  label: "c2"
                },
              {
                label: 'World2',
                value: 'dabbac75-4afa-4a16-8991-fc736bce8ced2',
              }
              ]
            },
          ],


        },{

          value: "Áo c",
          label: "Áo c",
          children: [
            {
              value: "zhonghuamen2",
              label: "Zhong Hua Men2",
              children: [
                {
                  value: "c2",
                  label: "c2"
                },
              {
                label: 'World2',
                value: 'dabbac75-4afa-4a16-8991-fc736bce8ced2',
              }
              ]
            },
          ],

        }

      
      ]
    }
  ];
  
  const onChange = (value) => {
    console.log(value);
  };
  
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);

    const handleCloses =() => {
      
      console.log('lưu')
    setShow(false);}
    const handleShow = () => setShow(true);

    const handleToggle = (event, nodeIds) => {
      setExpanded(nodeIds);
      console.log(nodeIds)
    
    };
  
    const handleSelect = (event, nodeIds) => {
      setSelected(nodeIds);
      console.log( "", nodeIds)
    };


    /// data khi click
    // console.log(props)
     

   
  return (
    <div>

      <Button variant="primary" onClick={handleShow} style={{background:"green", color:"white"}}>
        Thêm danh mục cho sản phẩm
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Thêm danh mục
          <br/>
         
          
          
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Box sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
      <Box sx={{ mb: 1 }}>
     
      </Box>


      <Cascader
    
      options={options}
      onChange={onChange}
      />
      {/* <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect
      >
      
        <TreeItem nodeId="Thời Trang Nam" label="Thời Trang Nam">
          <TreeItem nodeId="Áo khoác" label="Áo khoác">
            <TreeItem nodeId="Áo Hoddie" label="Áo Hoddie">
              <TreeItem nodeId="Áo" label="Áo" />
              <TreeItem nodeId="e" label="e" />
              <TreeItem nodeId="m" label="m" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView> */}
    </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} >Áp dụng</Button>
        </Modal.Footer>
      </Modal>
         
    </div>
  )
}

export default Treedm