import React, { useState } from 'react'
import styles from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    //количество страниц
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    //массив, содержащий номера страниц
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    //количество порций
    let portionCount = Math.ceil(pagesCount / portionSize);

    //хук для динамичного отображения кнопок PREV, NEXT
    let [portionNumber, setPortionNumber] = useState(1);

    //вычисление границ порций
    let leftBorder = (portionNumber - 1) * portionSize + 1;
    let rightBorder = portionNumber * portionSize;

    return <div className={styles.paginator}>

        {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}

        {pages
            .filter(p => p >= leftBorder && p <= rightBorder)
            .map(p => {
                return <span className={ cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber) }
                    key={p} onClick={() => {onPageChanged(p)}}>{p}</span>
        })}

        {portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}

    </div>
}

export default Paginator;