import TextName from './textname';

export default function Footer(props){
    return(
      <div>
        <p>Hello I am <TextName textname='string2'/> from {props.name}</p>
      </div>
    );
}

