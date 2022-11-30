import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { WrongInput, Input, IconValidation, GroupInput } from "../styles/FormStyles";

const FormInput = (props) => {
   const handleInput = (e) => {
      props.changeState({ ...props.state, value: e.target.value });
   };
   const validation = () => {
      if (props.regularExpresion) {
         if (props.regularExpresion.test(props.state.value)) {
            props.changeState({ ...props.state, flag: "true" });
         } else {
            props.changeState({ ...props.state, flag: "false" });
         }
      }
   };

   return (
      <div className="form-group w-100" style={{ width: "150px" }}>
         <GroupInput>
            <Input
               type={props.type}
               name={props.name}
               id={props.name}
               placeholder={props.placeholder}
               value={props.state.value}
               onChange={handleInput}
               onBlur={validation}
               onKeyUp={validation}
               flag={props.state.flag}
            />
            <IconValidation
               icon={props.state.flag === "true" ? faCheckCircle : faTimesCircle}
               flag={props.state.flag}
            />
         </GroupInput>
         <WrongInput flag={props.state.flag}>{props.error}</WrongInput>
      </div>
   );
};

export default FormInput;
