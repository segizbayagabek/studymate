import logo from "../../assets/sdu-logo.png";
import campus from "../../assets/sdu-campus.png";
import Diamond from "../common/Diamond.jsx";
import { t } from "../../i18n.js";

export default function LoginHero() {
  return (
    <div className="hidden flex-col gap-10 bg-navy p-12 lg:flex">
      <div className="flex items-center gap-3.5">
        <div className="rounded-[14px] bg-paper px-4 py-3">
          <img src={logo} alt="SDU University" className="h-16" />
        </div>
        <div>
          <div className="font-serif text-[22px] font-medium text-white">Study Mate</div>
          <div className="text-[9px] font-bold tracking-[0.2em] text-peach/90">{t("login.byUniversity")}</div>
        </div>
      </div>

      <div>
        <p className="mb-5 max-w-[18ch] font-serif text-[44px] leading-tight text-white">
          {t("login.headline")}
        </p>
        <div className="flex items-start gap-3">
          <Diamond className="mt-2 size-[9px]" />
          <p className="font-serif text-base italic text-white/70">
            {t("login.quote")}
          </p>
        </div>
      </div>

      <img
        src={campus}
        alt="SDU campus"
        className="min-h-48 w-full flex-1 rounded-2xl border border-white/15 object-cover"
      />
    </div>
  );
}
