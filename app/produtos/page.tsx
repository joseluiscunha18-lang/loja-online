"use client";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryPills } from "@/components/site/CategoryPills";
import { PRODUCTS, type Category } from "@/lib/shop-data";
import { useState } from "react";
export default function Produtos(){const [category,setCategory]=useState<Category>("Tudo");const products=category==="Tudo"?PRODUCTS:PRODUCTS.filter(p=>p.category===category);return <section className="mx-auto max-w-6xl px-4 py-12"><p className="eyebrow">A coleção Bliss</p><h1 className="font-display mt-3 text-5xl">Todos os produtos</h1><p className="mt-4 max-w-xl text-muted-foreground">Beleza, acessórios e moda escolhidos para si.</p><div className="mt-8"><CategoryPills active={category} onChange={setCategory}/></div><div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>}
