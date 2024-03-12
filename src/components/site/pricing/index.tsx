import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import { stripe } from "@/lib/stripe";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Macbook } from "@/components/site/macbook";

type Props = {};

export default async function Pricing() {
  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  });

  return (
    <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
      <article className="relative">
        <div className="rounded-full p-[1px] bg-gradient-to-r from-brand-primaryBlue to-brand-primaryPurple absolute top-0 left-0 right-0 h-[1px]" />
        <div className="rounded-full p-[1px] text-sm bg-gradient-to-r from-brand-primaryBlue to-brand-primaryPurple relative">
          <h1 className="subtext text-lg">Pricing</h1>
        </div>
      </article>
      <h2 className="text-left text-3xl sm:text-5xl sm:max-w-[750px] md:text-center font-semibold">
        Choose what fits you right
      </h2>

      <div className="w-[40rem] h-4 relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>

      <p className="dark:text-washed-purple-700 sm:max-w-[450px] md:text-center">
        Our straightforward pricing plans are tailored to meet your needs. If
        you're not ready to commit you can get started for free.
      </p>

      <div className="flex  justify-center gap-4 flex-wrap mt-6">
        {prices.data.map((card) => (
          //WIP: Wire up free product from stripe
          <Card
            key={card.nickname}
            className={clsx("w-[300px] flex flex-col justify-between", {
              "border-2 border-primary": card.nickname === "Unlimited Saas",
            })}
          >
            <CardHeader>
              <CardTitle
                className={clsx("", {
                  "text-muted-foreground": card.nickname !== "Unlimited Saas",
                })}
              >
                {card.nickname}
              </CardTitle>
              <CardDescription>
                {
                  pricingCards.find((c) => c.title === card.nickname)
                    ?.description
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">
                {card.unit_amount && card.unit_amount / 100}
              </span>
              <span className="text-muted-foreground">
                <span>/ {card.recurring?.interval}</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {pricingCards
                  .find((c) => c.title === card.nickname)
                  ?.features.map((feature) => (
                    <div key={feature} className="flex gap-2">
                      <Check />
                      <p>{feature}</p>
                    </div>
                  ))}
              </div>
              <Link
                href={`/agency?plan=${card.id}`}
                className={clsx(
                  "w-full text-center bg-primary p-2 rounded-md",
                  {
                    "!bg-muted-foreground": card.nickname !== "Unlimited Saas",
                  }
                )}
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
        <Card className={clsx("w-[300px] flex flex-col justify-between")}>
          <CardHeader>
            <CardTitle
              className={clsx({
                "text-muted-foreground": true,
              })}
            >
              {pricingCards[0].title}
            </CardTitle>
            <CardDescription>{pricingCards[0].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">$0</span>
            <span>/ month</span>
          </CardContent>
          <CardFooter className="flex flex-col  items-start gap-4 ">
            <div>
              {pricingCards
                .find((c) => c.title === "Starter")
                ?.features.map((feature) => (
                  <div key={feature} className="flex gap-2">
                    <Check />
                    <p>{feature}</p>
                  </div>
                ))}
            </div>
            <Link
              href="/agency"
              className={clsx("w-full text-center bg-primary p-2 rounded-md", {
                "!bg-muted-foreground": true,
              })}
            >
              Get Started
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
