import { Input } from "../../../style/globalComponents";
import {GroupContainer, InputContainer } from "../styled";


export const actualDate: string = `${new Date().getFullYear()}-${
  (new Date().getMonth() + 1).toString().length === 1
    ? "0" + (new Date().getMonth() + 1)
    : new Date().getMonth() + 1
}-${(new Date().getDate()).toString().length === 1
    ? "0" + new Date().getDate()
    : new Date().getDate()}`;
 
interface DateInputProps {
    name?: string;
    handleChangeDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
    date: string;
  }
export function DateInput({name, handleChangeDate, date}: DateInputProps){
    return (
      <GroupContainer>
        <InputContainer>
          <Input type="date" value={date ? date : actualDate} onChange={handleChangeDate} name={name} />
        </InputContainer>
      </GroupContainer>
    );
  }
  