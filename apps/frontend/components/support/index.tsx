import {useTranslation} from "next-i18next";

interface SupportProjectProps { }

const SupportTheProject = (_: SupportProjectProps) => {
    const {t} = useTranslation()

    return (
        <div className="text-center">
            <h3 className="text-2xl mb-8 mt-4 text-white">{`${t('support_the_project')}`}</h3>
        </div>
    );
}

export default SupportTheProject