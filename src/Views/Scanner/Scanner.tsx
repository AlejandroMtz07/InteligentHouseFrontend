import style from './Scanner.module.css';

export default function Scanner() {
  return (
    <div className={style.scanner_content}>
      Content<br/>
      {localStorage.getItem('token')}
    </div>
  )
}
