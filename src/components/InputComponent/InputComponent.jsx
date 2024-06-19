import { Input } from 'antd'
import React from 'react'
import styled from 'styled-components';

const InputComponent = ({ size, placeholder, style, ...rests }) => {
    const StyledInput = styled(Input)`
border-top-left-radius: 8px; /* Không bo góc trên trái */
border-bottom-left-radius: 8px; /* Không bo góc dưới trái */
border-top-right-radius: 0; /* Bo góc trên phải */
border-bottom-right-radius: 0; /* Bo góc dưới phải */
  &:hover, &:focus {
    border-color: #d9d9d9; /* Màu viền khi hover và focus */
    box-shadow: none; /* Xóa bỏ shadow khi focus */
  }
`;
    return (
        <StyledInput
            size={size}
            placeholder={placeholder}
            {...rests}
        />
    )
}
export default InputComponent;