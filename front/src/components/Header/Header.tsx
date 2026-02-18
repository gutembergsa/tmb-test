import Logo from '../../assets/logo.png'
import { baseBlockPaddingType1 } from '../../utils/tailwindTemplates'

const Header = () => {
    return (
        <div
            className={`h-auto ${baseBlockPaddingType1} w-full flex items-center mt-[20px]`}>
            <a href="/">
                <img className="w-min h-min" src={Logo} alt="logo" />
            </a>
        </div>
    )
}

export default Header
