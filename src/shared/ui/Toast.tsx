import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Toast() {
  return (
    <ToastContainer
      limit={1}
      autoClose={3000}
      hideProgressBar
      closeOnClick
      position='top-center'
      className='p-4 w-full max-w-[500px]'
      toastClassName={() =>
        'bg-gray-600 text-white rounded-lg p-4 text-sm shadow-lg flex items-center'
      }
    />
  );
}
