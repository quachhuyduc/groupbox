import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(88, 204, 2);
    align-items:center
  
`
export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left;
`
export const WrapperHeaderAccount = styled.div`
     display: flex;
     align-items: center;
     color: #fff;
     gap:10px;
     font-size:13px;
`
export const WrapperTextHeaderSmall = styled.span`
     font-size:12px;
     color: #fff;
`
export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  align-items: center; /* Căn giữa cả logo và chữ theo chiều ngang */
`