/** @format */

import { FC } from 'react'
import styles from './Loading.module.css'

const LoadingSpinner: FC = ():JSX.Element => {
  return (
      <div className={styles.wrapper}>
          <div className={styles.loadingDualRing}></div>
          </div>
  )
}
export default LoadingSpinner