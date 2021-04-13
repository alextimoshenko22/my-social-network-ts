import React from 'react'
import styles from './FormsControls.module.css'
import { FieldRenderProps } from 'react-final-form';

const Input:React.FC<FieldRenderProps<string, HTMLElement>> = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            <input {...input} {...props} />
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export default Input