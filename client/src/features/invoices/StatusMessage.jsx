import { useSelector } from 'react-redux';
import './statusMessage.css';

const StatusMessage = ({text}) => {
    const nightMode = useSelector(state => state.visual.nightMode);

    return (
        <>
        <div className={nightMode ? "statusMessageMainContainer night" : "statusMessageMainContainer"}>
            <span className='statusMessageText'>{text}</span>
        </div>
        </>
    );
}
 
export default StatusMessage;