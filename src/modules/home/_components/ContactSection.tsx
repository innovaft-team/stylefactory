import Image from "next/image";
import React, { useState } from "react";
import { poppins, montserrat } from "@/fonts";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

const ContactSection = () => {
  const t = useTranslations("home.contact");
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const isHr = router.locale === "hr";
  const emailRequiredMsg = isHr
    ? "Email adresa je obavezna"
    : "Email address is required";
  const emailInvalidMsg = isHr
    ? "Unesite valjanu email adresu"
    : "Please enter a valid email address";
  const companyRequiredMsg = isHr
    ? "Naziv tvrtke je obavezan"
    : "Company name is required";
  const messageRequiredMsg = isHr
    ? "Poruka je obavezna"
    : "Message is required";

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || t("form.statusError"));
      }

      // Set popup message and open it
      setPopupMessage(
        isHr
          ? "Hvala, vaša poruka je poslana."
          : "Thank you, your message has been sent.",
      );
      setShowPopup(true);

      setSubmitStatus("success");
      reset();
    } catch (err: any) {
      setSubmitStatus("error");
      setErrorMessage(err.message || t("form.statusError"));
    }
  };

  return (
    <>
      <section
        className="relative sm:px-6 xl:px-10 pt-2.5 min-[450px]:pt-4 md:pt-9.25 pb-5"
        style={{ fontFamily: poppins.style.fontFamily }}
      >
        <h3 className="sm:text-xl md:text-[33px] font-medium uppercase relative z-20 text-center">
          {t("titleStrong")}{" "}
          <span className="text-[#48443e]/58">{t("titleLight")}</span>
        </h3>
        {/* Without `sizes` the browser assumes 100vw and multiplies by DPR, so
            a 412px phone at DPR 2.6 pulled the 2000w variant of this banner. */}
        <Image
          src={"/images/home-redesign/contact-bd.webp"}
          width={1000}
          height={1000}
          sizes="100vw"
          quality={70}
          className="w-full h-full absolute top-0 left-0 object-cover"
          alt={"contact section banner"}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
          <div className="mt-6 md:mt-8 xl:mt-15.5 flex flex-col md:flex-row gap-2.5">
            <div className="grid grid-cols-2 w-full md:max-w-100 xl:max-w-124.75 gap-2.5">
              <div className="flex flex-col">
                <input
                  className={`text-[13px] text-black placeholder-[#B0ABA7] placeholder:text-[13px] px-1.75 py-3.5 outline-0 bg-white ${
                    errors.name
                      ? "border border-red-500"
                      : "border border-transparent"
                  }`}
                  placeholder={t("form.name")}
                  type="text"
                  {...register("name")}
                />
              </div>
              <div className="flex flex-col">
                <input
                  className={`text-[13px] text-black placeholder-[#B0ABA7] placeholder:text-[13px] px-1.75 py-3.5 outline-0 bg-white ${
                    errors.phone
                      ? "border border-red-500"
                      : "border border-transparent"
                  }`}
                  placeholder={t("form.phone")}
                  type="tel"
                  {...register("phone")}
                />
              </div>
              <div className="flex flex-col">
                <input
                  required
                  className={`text-[13px] text-black placeholder-[#B0ABA7] placeholder:text-[13px] px-1.75 py-3.5 outline-0 bg-white ${
                    errors.email
                      ? "border border-red-500"
                      : "border border-transparent"
                  }`}
                  placeholder={t("form.email")}
                  type="email"
                  {...register("email", {
                    required: emailRequiredMsg,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                      message: emailInvalidMsg,
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-[11px] text-red-500 px-1 mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  required
                  className={`text-[13px] text-black placeholder-[#B0ABA7] placeholder:text-[13px] px-1.75 py-3.5 outline-0 bg-white ${
                    errors.company
                      ? "border border-red-500"
                      : "border border-transparent"
                  }`}
                  placeholder={t("form.company")}
                  type="text"
                  {...register("company", { required: companyRequiredMsg })}
                />
                {errors.company && (
                  <span className="text-[11px] text-red-500 px-1 mt-1">
                    {errors.company.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <textarea
                required
                className={`w-full h-full min-h-27.5 text-[13px] text-black placeholder-[#B0ABA7] placeholder:text-[13px] px-1.75 py-3.5 outline-0 resize-none bg-white ${
                  errors.message
                    ? "border border-red-500"
                    : "border border-transparent"
                }`}
                placeholder={t("form.message")}
                {...register("message", { required: messageRequiredMsg })}
              ></textarea>
              {errors.message && (
                <span className="text-[11px] text-red-500 px-1 mt-1">
                  {errors.message.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end mt-4.5">
            {submitStatus === "success" && (
              <p className="text-[#8C8476] text-sm font-medium mb-2 text-center md:text-right">
                {t("form.statusSuccess")}
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-sm font-medium mb-2 text-center md:text-right">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={submitStatus === "sending"}
              className="w-41.5 min-[450px]:w-50.5 h-10 min-[450px]:h-12 flex items-center justify-center text-[10px] font-bold uppercase bg-no-repeat bg-size-[100%_100%] bg-transparent transition-all duration-300 hover:scale-108 hover:opacity-90 disabled:opacity-50 cursor-pointer"
              style={{
                backgroundImage: "url(/images/home-redesign/btn-bg.webp)",
              }}
            >
              <span className="text-[#8C8476]">
                {submitStatus === "sending"
                  ? t("form.sending")
                  : t("form.send")}
              </span>
            </button>
          </div>
        </form>

        <AnimatePresence>
          {showPopup && (
            <div className="fixed inset-0 z-9999 flex items-center justify-center px-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPopup(false)}
                className="absolute inset-0 bg-black/50 backdrop-blur-xs"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
                className="relative bg-[#fbfbf8] border border-[#e5e5e0] p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center rounded-sm"
              >
                {/* Checkmark Icon */}
                <div className="size-12 rounded-full border border-[#8C8476] flex items-center justify-center mb-4">
                  <svg
                    className="size-6 text-[#8C8476]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h4
                  className="text-lg font-semibold uppercase tracking-wider text-[#161616]"
                  style={{ fontFamily: montserrat.style.fontFamily }}
                >
                  {isHr ? "Uspješno!" : "Success!"}
                </h4>

                <p className="text-sm text-[#48443e] mt-2 font-light leading-relaxed">
                  {popupMessage}
                </p>

                <button
                  onClick={() => setShowPopup(false)}
                  className="mt-6 w-32 h-10 flex items-center justify-center text-[10px] font-bold uppercase bg-no-repeat bg-size-[100%_100%] bg-transparent transition-all duration-300 hover:scale-108 hover:opacity-90 cursor-pointer"
                  style={{
                    backgroundImage: "url(/images/home-redesign/btn-bg.webp)",
                  }}
                >
                  <span className="text-[#8C8476]">
                    {isHr ? "Zatvori" : "Close"}
                  </span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="max-md:px-4 mt-6">
          <h3
            className="max-md:mt-5 text-center md:text-left text-[13px] min-[450px]:text-lg leading-[162%] md:text-[21px] font-medium uppercase relative z-20 text-[#8C8476]"
            style={{ fontFamily: montserrat.style.fontFamily }}
          >
            {t("heading")}
          </h3>
          <div className="mt-3 sm:mt-4 relative z-20 text-black flex flex-row justify-between md:flex-col md:justify-start">
            <div className="flex flex-col text-left text-xs min-[450px]:text-base items-start gap-0.5">
              <a href="tel:+385996666331" className="contact-link">
                +385 99 6666 331
              </a>
              <a href="tel:+385991697357" className="contact-link">
                +385 99 169 7357
              </a>
              <a
                href="mailto:info@stylefactory.hr"
                className="contact-link md:mt-4"
              >
                info@stylefactory.hr
              </a>
            </div>
            <div className="flex flex-col text-right md:text-left md:mt-1.5 text-xs min-[450px]:text-base">
              <span>{t("country")}</span>
              <span className="hidden md:inline">
                {t("street")}, {t("city")}
              </span>
              <span className="md:hidden">{t("street")}</span>
              <span className="md:hidden">{t("city")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
