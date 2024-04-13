import {useTranslation} from "next-i18next";
import {Image} from "@nextui-org/react";
import SupportCryptoBlock from "./image";

interface SupportProjectProps {
}

const SupportTheProject = (_: SupportProjectProps) => {
    const {t} = useTranslation()

    return (
        <div className="text-center">
            <h2 className="text-3xl lg:text-4xl mt-4 lg:mt-4 font-bold mb-8 mt-4 text-white">{`${t('support_the_project')}`}</h2>

            <div className="grid content-center grid-cols-2 justify-items-center">
                <SupportCryptoBlock title={t('support_btc_wallet')} src="images/crypto/btc_wallet.png" link={t('support_btc_link')}/>
                <SupportCryptoBlock title={t('support_eth_wallet')} src="images/crypto/eth_wallet.png" link={t('support_eth_link')}/>
            </div>
        </div>
    );
}

export default SupportTheProject