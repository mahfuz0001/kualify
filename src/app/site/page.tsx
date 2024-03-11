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

export default async function Home() {
  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  });

  return (
    <>
      {/* <TracingBeam className=""> */}
      <section className="h-full w-full md:pt-44 mt-[-70px] relative flex items-center justify-center flex-col ">
        {/* grid */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
        {/* Lamp Boii */}

        {/* Hero */}
        <div className="h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
          <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
            <h1 className="text-9xl font-bold text-center md:text-[300px]">
              Kualify
            </h1>
          </div>
          <div className="w-[80rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="white"
              minSize={0.4}
              maxSize={1}
              particleDensity={1700}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        {/* <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">
            Kualify
          </h1>
        </div> */}
      </section>
      {/* infinity testimonial */}
      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
      {/* pricing */}
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        <h2 className="text-4xl text-center"> Choose what fits you right</h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
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
                      "!bg-muted-foreground":
                        card.nickname !== "Unlimited Saas",
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
                className={clsx(
                  "w-full text-center bg-primary p-2 rounded-md",
                  {
                    "!bg-muted-foreground": true,
                  }
                )}
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
      {/* </TracingBeam> */}
    </>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
