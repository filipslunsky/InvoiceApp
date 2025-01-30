import { useSelector } from 'react-redux';
import './statusMessage.css';

const StatusMessage = ({text, style}) => {
    const nightMode = useSelector(state => state.visual.nightMode);

    return (
        <>
        <div className={nightMode ? `statusMessageMainContainer nightMode ${style}` : `statusMessageMainContainer ${style}`}>
            <span className='statusMessageText'>{text}</span>
        </div>
        </>
    );
}
 
export default StatusMessage;