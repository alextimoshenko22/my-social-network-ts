import React, { useState, useEffect } from "react";
import style from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  //динамичное обновление статуса
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  }
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }
  let onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  }
  return (
    <div>
      {!editMode && (
        <div className={style.status}>
          <b>Status</b>: <span onDoubleClick={activateEditMode} >{props.status || '-----'}</span>
        </div>
      )}
      {editMode && (
        <div className={style.status}>
          <input autoFocus={true} onBlur={deactivateEditMode} value={status} onChange={onStatusChange} />
        </div>
      )}
    </div>
  );
}

export default ProfileStatusWithHooks;
