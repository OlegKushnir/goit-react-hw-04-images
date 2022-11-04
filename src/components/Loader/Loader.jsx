import { ThreeCircles } from 'react-loader-spinner'
import css from './Loader.module.css';
export const Loader= ()=> {
  return <ThreeCircles
  height="100"
  width="100"
  color="#3f51b5"
  wrapperStyle={{}}
  wrapperClass={css.loader}
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/>
}
