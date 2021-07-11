import 'dotenv/config'
import Mdcin from './classes/collector/Mdcin'

const mdcinInst = new Mdcin(process.env.MDCIN_ENCODING_KEY!)