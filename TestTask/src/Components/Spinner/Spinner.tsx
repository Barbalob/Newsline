import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
    return (
        <TailSpin
              visible={true}
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{margin:'10px auto',justifyContent: 'center'}}
              wrapperClass=""
            />
    );
};

export default Spinner;