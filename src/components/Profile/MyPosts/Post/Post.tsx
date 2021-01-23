import React from 'react'
import s from './Post.module.css'

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKvi0zkOBGtHXb-mcQToL8gTGUx_ZCnz1qpA&usqp=CAU' />
            {props.message}
            <div>
            <span>like {props.likesCount}</span>
            </div>

        </div>
    );
}

export default Post