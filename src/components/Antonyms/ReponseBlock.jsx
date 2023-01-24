import React, { useContext, useRef, useState } from 'react'
import { AntonymsContext } from './Antonyms'
import { useEffect } from 'react'

const ReponseBlock = ({text , fakeResponse , rep}) => {

    const {mousePos, setmousePos , dataMooving , setDataMooving} = useContext(AntonymsContext)
  const [dropped , setDropped] = useState(false)
    const handleDrop = e => {
      console.log('mooving')
      if(dropped){
        if(rep === dataMooving.data){
          console.log('concordance')
        }else{
          console.log('nothing')
          // dataMooving.item.current.position = ''
          // setDataMooving
        }
      }
      // if(rep === dataMooving.data){
      //   console.log('concordance')
      // }else{
      //   // dataMooving.item.current.position = ''
      //   // setDataMooving
      // }

    }

    const handleMouseUp = e => {
      console.log('mouse Upped')
      setDropped(true)
    }
  return (
    <div className='response-block' >
        <div className='drop-zone' onMouseMove={handleDrop} >
          <div onMouseUp={handleMouseUp}></div>
        </div>
        <div>{text}</div>
        <Draggable >{fakeResponse}</Draggable>
    </div>
  )
}

const Draggable = (props)=>{
  const dragg = useRef(null)
  const {mousePos, setmousePos , dataMooving , setDataMooving} = useContext(AntonymsContext)
  // console.log('first')
  const handleMouseDown = e =>{
    // console.log({...dragg.current})
    // e.target.style.top = e.clientY
    // e.target.style.left = e.clientX
    setDataMooving({data : props.children , isMooving : true})

  }

  const handleMouseUp = e =>{
    // console.log({...dragg.current})
    // e.target.style.top = e.clientY
    // e.target.style.left = e.clientX
    setDataMooving({data : null , isMooving : false , item : dragg})

  }
  useEffect(() => {
    if(dataMooving.isMooving && dataMooving.data === props.children){
      if(props.children === dataMooving.data)
      dragg.current.style.position = 'fixed'
      dragg.current.style.left = mousePos[0]+'px'
      dragg.current.style.top = mousePos[1]+'px'
      dragg.current.style.zIndex = 500
    }
  }, [dataMooving , mousePos , props])
  

  

  return <div ref={dragg} className='rep unselectable' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>{props.children}</div>
}
export default ReponseBlock