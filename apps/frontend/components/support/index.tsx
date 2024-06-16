import {useTranslation} from "next-i18next";
import {Image} from "@nextui-org/react";
import SupportCryptoBlock from "./image";

interface SupportProjectProps {
}

const SupportTheProject = (_: SupportProjectProps) => {
    const {t} = useTranslation()

    return (
        <div className="text-center" id="support-project-container">
            <h2 className="text-3xl lg:text-4xl mt-4 lg:mt-4 font-bold mb-8 mt-4 text-white">{`${t('support_the_project')}`}</h2>

            <div className="grid content-center grid-cols-4 justify-items-center">
                <SupportCryptoBlock title={t('support_usdt_erc_20_wallet')} src="images/crypto/usdt_erc_20_wallet.png" link={t('support_usdt_erc_20_link')}/>
                <SupportCryptoBlock title={t('support_usdt_arb_wallet')} src="images/crypto/usdt_arb_wallet.png" link={t('support_usdt_arb_link')}/>
                <SupportCryptoBlock title={t('support_btc_wallet')} src="images/crypto/btc_wallet.png" link={t('support_btc_link')}/>
                <SupportCryptoBlock title={t('support_eth_wallet')} src="images/crypto/eth_wallet.png" link={t('support_eth_link')}/>
                <SupportCryptoBlock title={t('support_bnb_wallet')} src="images/crypto/bnb_wallet.png" link={t('support_bnb_link')}/>
                <SupportCryptoBlock title={t('support_matic_wallet')} src="images/crypto/matic_wallet.png" link={t('support_matic_link')}/>
                <SupportCryptoBlock title={t('support_solana_wallet')} src="images/crypto/solana_wallet.png" link={t('support_solana_link')}/>
                <SupportCryptoBlock title={t('support_ton_wallet')} src="images/crypto/ton_wallet.png" link={t('support_ton_link')}/>
            </div>
        </div>
    );
}

export default SupportTheProject