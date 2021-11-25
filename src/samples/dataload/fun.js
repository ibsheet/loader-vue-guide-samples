import { QSelect } from 'quasar'
// import { Select, MenuItem } from '@material-ui/core';


export const dataFunction = () => {


  return (
    <div>
      조회 건 수:
      <QSelect>
        <option value={ 100000 }>100,000 건</option>
        <option value={ 200000 }>200,000 건</option>
        <option value={ 300000 }>300,000 건</option>
      </QSelect>
      <button>
        조회
      </button>
      
    </div>
  );
};
