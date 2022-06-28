import ITypeIcon from '../../interface/ITypeIcon'

let IconDatas: {[key in keyof typeof ITypeIcon]: any};

IconDatas = {NEW: 'a', OLD: 'b'};

export default IconDatas;
