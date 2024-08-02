import { IoHomeOutline } from "react-icons/io5";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Button, Result } from 'antd';
import { useNavigate, useParams } from "react-router-dom";

// Breadcrumb Variable
const listCrumbs = [
  { name: <IoHomeOutline className='text-[20px]' />, url: '/' },
  { name: 'Result', url: 'checkout/result' },
]

const ResultPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb crumbs={listCrumbs} />
      <Result
        status="success"
        title="Successfully Purchased!"
        subTitle="Your order have been taken 1-2 minutes, please wait."
        extra={[
          <Button
            type="primary"
            style={{ backgroundColor: '#1677ff' }}
            key="home"
            onClick={() => navigate('/')}
          >
            Go HomePage
          </Button>,
          <Button
            key="buy"
            onClick={() => navigate(`/account/order-history/${orderId}`)}
          >
            Check your order
          </Button>,
        ]}
      />
    </>
  );
};

export default ResultPage;