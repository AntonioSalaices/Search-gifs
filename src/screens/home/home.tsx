import { useMemo, useState } from 'react';

import Message from '@Components/basics/Message/Message';
import Spinner from '@Components/basics/Spinner/Spinner';
import {MemoizedList} from '@Components/composed/List/List';

import { DOTENV } from '@Constans/constants';
import { PURPLE } from '@Utils/colors';
import Formatter from '@Utils/formatter';
import Form from './components/Form/Form';
import { FormState } from '@Utils/types';

import useFetch from '@Hooks/useFetch/useFetch';

const { getFormatedData } = Formatter;


const Home = (): React.ReactElement => {
  const [values, setValues] = useState<FormState>({
    search: '',
    pagination:'10'
  });
  
  const url: string = `${DOTENV.API_URL}${DOTENV.API_SEARCH}}`
        .replace("{key}", DOTENV.API_KEY)
        .replace("{search}", values.search)
        .replace("{pagination}", values.pagination);


  const { data, loading } = useFetch(url);
  const latestData = useMemo(() => getFormatedData(data), [data]);
  const hasData: boolean = data?.length > 0;
  const isShownNoFoundMessage: boolean = (!hasData && Boolean(values.search));


  //We can reuse this function for another inputs
  const handleCurried = (fieldName: string) => {
    return ({target: {value}} : React.ChangeEvent<HTMLInputElement>) => {
       setValues((prev: FormState) => ({
        ...prev,
        [fieldName]: value
       })) 
    }
  }
  
  return (
    <div className="container">
      <Form search={values.search} handleCurried={handleCurried} pagination={values.pagination}  />
        <svg>
          <circle cx="50" cy="50" r="40" stroke="red" fill="yellow" />
        </svg>
        {loading ? <Spinner singleColor={PURPLE} /> : <></>}
        {hasData ? <MemoizedList data={latestData} /> : <></>}
        {isShownNoFoundMessage ? <Message message={`No gifs found for ${values.search}`} /> : <></>}
    </div>
  );
}

export default Home; 