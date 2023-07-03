import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store'
import ErrorBoundary from './components/ErrorBoundary';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
      <App/>
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
);

