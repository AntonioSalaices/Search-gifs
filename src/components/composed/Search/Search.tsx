import Input from '@Components/basics/Input';
import { SearchProps } from './Search.props';
import { FaSearch } from 'react-icons/fa';
import { translate } from '@Translate/translate';

const Search: React.FC<SearchProps> = ({ search, handleChange, txOptions, text, tx, subTx, subText }) => {
  const i18Text = tx && translate(tx, txOptions);
  const content = i18Text || text;
  const i18SubText = subTx && translate(subTx, txOptions);
  const subContent = i18SubText || subText;

  return (
    <div className="col-11-xs col-11-sm col-5-md col-5-xl">
      <Input
        icon={<FaSearch />}
        testID="searchInput"
        value={search}
        type="text"
        placeholder={content}
        subText={subContent}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
