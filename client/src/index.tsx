import ReactDOM from 'react-dom'
import App from './App'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import './assets/styles/_index.scss'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const rootElement = document.querySelector('#root')! as HTMLDivElement //  rootElement
ReactDOM.render(
  // <React.StrictMode>
  // <App />
  // </React.StrictMode>

  <App />,
  rootElement,
)
