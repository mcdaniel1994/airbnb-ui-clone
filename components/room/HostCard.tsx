"use client";

import { useState } from "react";
import Image from "next/image";
import type { Host } from "@/types";
import Icon from "@/components/shared/Icon";

type HostCardProps = {
  host: Host;
};

export default function HostCard({ host }: HostCardProps) {
  const [showContact, setShowContact] = useState(false);

  return (
    <section className="mt-6 border-t border-[color:var(--color-border)] pt-6">
      <h2 className="text-lg font-semibold text-[color:var(--color-text-primary)]">Meet your host</h2>
      <div className="mt-4 rounded-xl border border-[color:var(--color-border)] p-4">
        <div className="flex items-center gap-4">
          <Image
            alt={`${host.name}'s profile photo`}
            className="h-16 w-16 rounded-full object-cover"
            height={64}
            src={host.avatar}
            width={64}
          />
          <div>
            <h3 className="text-lg font-semibold">{host.name}</h3>
            {host.isSuperhost ? (
              <p className="inline-flex items-center gap-1 text-sm text-[color:var(--color-text-secondary)]">
                <Icon className="h-4 w-4" name="medal" />
                Superhost
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 divide-x divide-[color:var(--color-border)] rounded-xl bg-[var(--color-bg-muted)] py-3 text-center">
          <div>
            <p className="text-sm font-semibold">{host.reviewCount}</p>
            <p className="text-xs text-[color:var(--color-text-secondary)]">Reviews</p>
          </div>
          <div>
            <p className="text-sm font-semibold">{host.rating.toFixed(2)}</p>
            <p className="text-xs text-[color:var(--color-text-secondary)]">Rating</p>
          </div>
          <div>
            <p className="text-sm font-semibold">{host.yearsHosting}</p>
            <p className="text-xs text-[color:var(--color-text-secondary)]">Years</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6">{host.bio}</p>
        <div className="mt-4 space-y-1 text-sm">
          <p>Response rate: {host.responseRate}</p>
          <p>Responds {host.responseTime}</p>
        </div>
        <button
          aria-expanded={showContact}
          className="mt-5 w-full rounded-lg bg-[var(--color-text-primary)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          type="button"
          onClick={() => setShowContact((current) => !current)}
        >
          Message host
        </button>
        {showContact ? (
          <div className="mt-4 rounded-lg bg-[var(--color-bg-muted)] p-4 text-sm text-[color:var(--color-text-primary)]">
            <p className="font-semibold">Message sent to {host.name}</p>
            <p className="mt-1 text-[color:var(--color-text-secondary)]">
              {host.name} usually responds {host.responseTime}.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
