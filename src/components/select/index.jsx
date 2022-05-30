import styles from './TextField.module.scss';

const Select = (props) => {
  return (
    <select className={styles.textfield} {...props}>
      { props.children }
    </select>
  )
};

export default Select;