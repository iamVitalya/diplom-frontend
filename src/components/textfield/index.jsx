import styles from './TextField.module.scss';

const TextField = (props) => {
  return (
    <input className={styles.textfield} {...props}/>
  )
};

export default TextField;