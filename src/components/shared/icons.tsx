interface Props {
    name: string
    color?: string;
    class?: string;
}
interface IconsTypes {
    [key: string]: JSX.Element
}
export default function ICON(props: Props): JSX.Element | null {
    const CLASS: string = props.class || 'icon';
    const COLOR = props.color || 'black';
    const WIDTH = 14;
    const ICONS: IconsTypes = {
        //a
        'angle-right': <svg xmlns="http://www.w3.org/2000/svg" className={CLASS} width={WIDTH} viewBox="0 0 256 512"><path fill={COLOR} d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" /></svg>,
        'angle-left': <svg xmlns="http://www.w3.org/2000/svg" className={CLASS} width={WIDTH} viewBox="0 0 256 512"><path fill={COLOR} d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" /></svg>,
        // you can add any svg you want from https://fontawsome.com like above 
    };
    if (ICONS.hasOwnProperty(props.name)) return ICONS[props.name];
    return null;
};