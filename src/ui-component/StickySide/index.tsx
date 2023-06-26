import { Aside } from './styles';

export interface StickySideProps {
    children?: JSX.Element
}
const StickySide = (props: StickySideProps) => {
    return (
        <Aside>
            {props.children!}
        </Aside>
    );
};

export default StickySide;
