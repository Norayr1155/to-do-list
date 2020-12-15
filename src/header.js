import TextName from './textname';

export default function Header(props){
    return(
      <div>
        <p>Hello I am <TextName textname={'string1'} /> from {props.name}</p>
      </div>
    )
  }