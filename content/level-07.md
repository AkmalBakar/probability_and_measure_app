---
level: 7
title: "Simple Functions & Approximation"
notes: 2
prerequisites: [6]
---

# Level 7: Simple Functions & Approximation

## Reading

In Riemann integration, you approximate a function by step functions -- rectangles sitting on subintervals. Lebesgue integration takes a fundamentally different approach: instead of slicing the *domain* into intervals, you slice the *range* into levels and ask "on which set does the function take values in this slice?" The building blocks for this approach are **simple functions**, and the key to making everything work is a powerful approximation theorem that lets you express *any* non-negative measurable function as a limit of simple functions.

### Simple functions

We work on a probability space $(\Omega, \mathcal{F}, \mathbb{P})$.

A **simple function** is built from indicator functions. Recall that for any $A \in \mathcal{F}$, the indicator $\mathbf{1}_A : \Omega \to \mathbb{R}^{\pm\infty}$ is defined by $\mathbf{1}_A(\omega) = 1$ if $\omega \in A$ and $0$ otherwise. A simple function is anything you can build from indicators using two operations:

1. **Scalar multiplication:** if $f$ is simple and $\alpha \in \mathbb{R}$, then $\alpha f$ is simple.
2. **Addition:** if $f$ and $g$ are simple, then $f + g$ is simple.

In other words, the simple functions form a vector space. Crucially, every simple function can be written as a **finite** sum of multiples of indicator functions:

$$f = \sum_{i=1}^{n} \alpha_i \mathbf{1}_{A_i}$$

where each $A_i \in \mathcal{F}$ and $\alpha_i \in \mathbb{R}$. The sets $A_i$ here need not be disjoint -- but as we'll see in Exercise 3, we can always find a representation where they are.

<details>
<summary>Formal Statement (Definition 11)</summary>

**Definition 11 (Simple function).** Given a probability space $(\Omega, \mathcal{F}, \mathbb{P})$, for any $A \in \mathcal{F}$ we call $\mathbf{1}_A$ simple. Any scalar multiple of a simple function is simple, and any sum of two simple functions is simple. Equivalently, $f$ is simple iff $f = \sum_{i=1}^{n} \alpha_i \mathbf{1}_{A_i}$ for some $\alpha_i \in \mathbb{R}$ and $A_i \in \mathcal{F}$.

</details>

(While we allow $\pm\infty$ in the codomain for technical convenience, the interesting cases are real-valued.)

### Representations of simple functions

There are several useful ways to write a simple function:

**Disjoint indicator representation.** Any simple function $f = \sum_{i=1}^n \alpha_i \mathbf{1}_{A_i}$ can be rewritten as $f = \sum_{I \subseteq [n]} \alpha_I \mathbf{1}_{A_I}$, where the sets $A_I = \bigcap_{i \in I} A_i \setminus \bigcup_{i \notin I} A_i$ are pairwise disjoint and partition $\Omega$. This is the "Venn diagram" decomposition: on each piece $A_I$, the function $f$ is constant.

**Block representation.** If $f$ is non-negative with values $0, v_1, v_1 + v_2, \ldots, v_1 + \cdots + v_t$, we can write $\alpha_i = \sum_{j=1}^{t_i} v_j$ and decompose each disjoint indicator into "blocks" of equal height: $f = \sum_{i=1}^n \sum_{j=1}^{t_i} v_j \mathbf{1}_{A_i}$.

**Slab representation.** We can also write $f = \sum_{j=1}^{t} v_j \mathbf{1}_{B_j}$ where $B_j = \bigcup_{i : t_i \geq j} A_i$, so that $B_1 \supseteq B_2 \supseteq \cdots$. Think of this as stacking "slabs" of height $v_j$ on nested sets. The slab representation is especially natural for the approximation construction below.

An important closure property: if $f$ and $g$ are simple, then $\max(f, g)$ and $\min(f, g)$ are also simple. This follows from the disjoint indicator representation -- on each piece of the Venn diagram both functions are constant, so the max and min are constant too.

### The approximation theorem: from simple to general

Here is the central construction of this level. Given *any* non-negative measurable function $f : \Omega \to \mathbb{R}_{\geq 0}^{\infty}$, we will build a sequence of simple functions $(g_n)_{n \in \mathbb{N}}$ that increases pointwise to $f$.

**The construction.** Set $f_0 = f$. For each $n \geq 1$, we do the following:

- If $n$ is **odd**, let $A_n = \{\omega \in \Omega : f_{n-1}(\omega) \geq 1\}$, set $\alpha_n = 1$, and define $f_n = f_{n-1} - \mathbf{1}_{A_n}$. This "peels off" a layer of height 1 from the parts of $f_{n-1}$ that are at least 1.

- If $n$ is **even**, let $A_n = \{\omega \in \Omega : \text{the fractional part of } f_{n-1}(\omega) \text{ is at least } 2^{-n/2}\}$, set $\alpha_n = 2^{-n/2}$, and define $f_n = f_{n-1} - 2^{-n/2}\mathbf{1}_{A_n}$. If $f_{n-1}(\omega) = \infty$, we define the fractional part to be 0. This refines the approximation at increasingly fine binary scales.

The partial sums $g_n = \sum_{i=1}^{n} \alpha_i \mathbf{1}_{A_i}$ are simple functions, and:

- $(g_n)$ is **pointwise monotone increasing**: each $g_n - g_{n-1} = \alpha_n \mathbf{1}_{A_n} \geq 0$.
- $g_n(\omega) \to f(\omega)$ for every $\omega$ (pointwise convergence).

**Why does it converge?** The idea is binary expansion. If $f(\omega) = \infty$, then $\omega \in A_n$ for every odd $n$, so $g_n(\omega) \geq n/2 \to \infty$. If $f(\omega)$ is a real number, write $f(\omega) = t + x$ where $t$ is the integer part and $0 \leq x < 1$. The odd steps peel off the integer part (contributing $t$ after $2t$ steps), while the even steps read off the binary digits of $x$: the binary expansion $x = 0.x_1 x_2 x_3 \ldots$ corresponds to $\omega \in A_{2n}$ if and only if $x_n = 1$. Since every real number has a binary expansion, $g_n(\omega) \to t + x = f(\omega)$.

**Uniform convergence for bounded functions.** If there exists $T$ such that $0 \leq f(\omega) \leq T$ for all $\omega$, then for $n \geq 2T$ the integer part has been fully peeled off, and the remaining error is at most $2^{-n/2}$. So $|f(\omega) - g_n(\omega)| \leq 2^{-n/2}$ for all $\omega$ simultaneously -- the convergence is uniform.

**The $\sigma$-algebra property.** The approximating sequence also satisfies $\sigma(g_n) \subseteq \sigma(f)$ for all $n$. This is because each $A_n$ is defined using only level sets of $f$ (or functions derived from $f$), so the information in $g_n$ is always a "coarsening" of the information in $f$.

<details>
<summary>Formal Statement (Approximation by Simple Functions)</summary>

**Theorem (Approximation).** For any non-negative measurable $f : \Omega \to \mathbb{R}_{\geq 0}^{\infty}$, there exists a sequence of simple functions $(g_n)_{n \in \mathbb{N}}$ with $0 \leq g_1 \leq g_2 \leq \cdots$ and $g_n(\omega) \to f(\omega)$ for all $\omega$. If $f$ is bounded, the convergence is uniform. Moreover, $\sigma(g_n) \subseteq \sigma(f)$ for all $n$.

**Proof.**

1. **Step 1 — Construction.** Set $f_0 = f$. For odd $n$: let $A_n = \{f_{n-1} \geq 1\}$, $\alpha_n = 1$, $f_n = f_{n-1} - \mathbf{1}_{A_n}$. For even $n$: let $A_n = \{\text{fractional part of } f_{n-1} \geq 2^{-n/2}\}$, $\alpha_n = 2^{-n/2}$, $f_n = f_{n-1} - 2^{-n/2}\mathbf{1}_{A_n}$. Define $g_n = \sum_{i=1}^n \alpha_i \mathbf{1}_{A_i}$.
2. **Step 2 — Monotonicity.** $g_n - g_{n-1} = \alpha_n \mathbf{1}_{A_n} \geq 0$, so $(g_n)$ is monotone increasing.
3. **Step 3 — Pointwise convergence.** If $f(\omega) = \infty$: $\omega \in A_n$ for every odd $n$, so $g_n(\omega) \geq n/2 \to \infty$. If $f(\omega) = t + x$ with $t \in \mathbb{N}_0$ and $0 \leq x < 1$: the odd steps peel off the integer part (contributing $t$ after $2t$ steps), while the even steps read off the binary digits of $x$, giving $g_n(\omega) \to t + x = f(\omega)$.
4. **Step 4 — Uniform convergence for bounded $f$.** If $0 \leq f \leq T$, then for odd $n \geq 2T + 1$, the integer part is exhausted and $A_n = \emptyset$. The remaining error is $\leq 2^{-n/2}$.
5. **Step 5 — $\sigma$-algebra containment.** By induction: $A_1 = f^{-1}([1,\infty]) \in \sigma(f)$. Inductively, $f_{n-1} = f - g_{n-1}$ is $\sigma(f)$-measurable (by Theorem 5 and the inductive hypothesis), so $A_n$ is a level set of a $\sigma(f)$-measurable function, hence $A_n \in \sigma(f)$.

$\square$

</details>

### Measurability via factorisation

The level concludes with a beautiful characterisation of $\sigma(f)$-measurability.

Suppose $f$ is an $(X, \mathcal{F}_X, \mu)$-valued random variable on $(\Omega, \mathcal{F}, \mathbb{P})$, and $g$ is another random variable on the same space. We know that $g$ is $\sigma(f)$-measurable if and only if $g$ "depends only on $f$" -- but what does this mean precisely?

Theorem 12 says: $g$ is $\sigma(f)$-measurable if and only if there exists a measurable function $h : X \to \mathbb{R}^{\pm\infty}$ such that $g(\omega) = h(f(\omega))$ for all $\omega \in \Omega$. In other words, $g$ factors through $f$ via a measurable map. The "if" direction is straightforward (pullback of measurable maps is measurable). The "only if" direction is the interesting part: you first prove it for simple $g$ (Exercise 5), then extend to non-negative $g$ using the approximation theorem, and finally handle general $g$ by splitting into positive and negative parts.

<details>
<summary>Formal Statement & Proof (Theorem 12)</summary>

**Theorem 12 (Factorisation).** Let $f$ be any $(X, \mathcal{F}_X, \mu)$-valued random variable on $(\Omega, \mathcal{F}, \mathbb{P})$, and let $g$ be a $\mathbb{R}^{\pm\infty}$-valued random variable. Then the following are equivalent: (i) there exists a $(\mathcal{F}_X, \mathcal{B}(\mathbb{R}^{\pm\infty}))$-measurable $h : X \to \mathbb{R}^{\pm\infty}$ with $g(\omega) = h(f(\omega))$ for all $\omega$; (ii) $g$ is $\sigma(f)$-measurable.

**Proof.**

1. **Step 1 — (i) $\Rightarrow$ (ii).** If $g = h \circ f$ for measurable $h$, then for any $S \in \mathcal{B}(\mathbb{R}^{\pm\infty})$: $g^{-1}(S) = f^{-1}(h^{-1}(S))$. Since $h$ is measurable, $h^{-1}(S) \in \mathcal{F}_X$, and by definition of $\sigma(f)$, $f^{-1}(h^{-1}(S)) \in \sigma(f)$. So $g$ is $\sigma(f)$-measurable.
2. **Step 2 — (ii) $\Rightarrow$ (i) for simple $g$.** By Exercise 3, write $g = \sum_{i=1}^t \alpha_i \mathbf{1}_{A_i}$ as a minimal disjoint indicator representation. Since $g$ is $\sigma(f)$-measurable, each level set $A_r = g^{-1}(\{r\})$ is in $\sigma(f)$, so $A_r = f^{-1}(B_r)$ for some $B_r \in \mathcal{F}_X$. Refine the $B_r$ to be pairwise disjoint. Define $h(x) = r$ if $x \in B_r'$, $h(x) = 0$ otherwise. Then $h$ is measurable and $g = h \circ f$.
3. **Step 3 — (ii) $\Rightarrow$ (i) for non-negative $g$.** Use the approximation theorem: let $g_1 \leq g_2 \leq \cdots$ be simple functions with $g_n \to g$ pointwise and $\sigma(g_n) \subseteq \sigma(g) \subseteq \sigma(f)$. By Step 2, $g_n = h_n \circ f$ for measurable $h_n$. For any $x$ in the range of $f$, the sequence $h_1(x), h_2(x), \ldots$ is monotone increasing. Let $h = \sup_n h_n$, which is measurable by Theorem 5. For any $\omega \in \Omega$: $h(f(\omega)) = \lim h_n(f(\omega)) = \lim g_n(\omega) = g(\omega)$.
4. **Step 4 — (ii) $\Rightarrow$ (i) for general $g$.** Write $g = g^+ - g^-$. Apply Step 3 to $g^+$ and $g^-$ separately to get $h^+$ and $h^-$. The required function is $h = h^+ - h^-$.

$\square$

</details>

## Key Results

### definition: Simple function
**Number:** Definition 11
**Plain English:** A simple function is any finite linear combination of indicator functions of measurable sets -- they are the "step functions" of Lebesgue integration.
**Formal:** Given a probability space $(\Omega, \mathcal{F}, \mathbb{P})$, for any $A \in \mathcal{F}$ we call $\mathbf{1}_A$ simple. Any scalar multiple of a simple function is simple, and any sum of two simple functions is simple. Equivalently, $f$ is simple iff $f = \sum_{i=1}^{n} \alpha_i \mathbf{1}_{A_i}$ for some $\alpha_i \in \mathbb{R}$ and $A_i \in \mathcal{F}$.
**Load-bearing:** yes

### theorem: Approximation by simple functions
**Number:** (Construction preceding Exercise 4)
**Plain English:** Every non-negative measurable function is the pointwise limit of an increasing sequence of simple functions. For bounded functions, the convergence is uniform.
**Formal:** For any non-negative measurable $f : \Omega \to \mathbb{R}_{\geq 0}^{\infty}$, there exists a sequence of simple functions $(g_n)_{n \in \mathbb{N}}$ with $0 \leq g_1 \leq g_2 \leq \cdots$ and $g_n(\omega) \to f(\omega)$ for all $\omega$. If $f$ is bounded, the convergence is uniform. Moreover, $\sigma(g_n) \subseteq \sigma(f)$ for all $n$.
**Proof:** Construct $g_n = \sum_{i=1}^n \alpha_i \mathbf{1}_{A_i}$ where odd steps peel off integer layers ($A_n = \{f_{n-1} \geq 1\}$, $\alpha_n = 1$) and even steps refine binary fractional approximation ($A_n = \{\text{frac}(f_{n-1}) \geq 2^{-n/2}\}$, $\alpha_n = 2^{-n/2}$). Monotonicity: $g_n - g_{n-1} = \alpha_n \mathbf{1}_{A_n} \geq 0$. Convergence: if $f(\omega) = \infty$, odd steps give $g_n \geq n/2 \to \infty$; if $f(\omega) = t + x$, odd steps contribute $t$ and even steps read binary digits of $x$, so $g_n(\omega) \to t + x$. Uniform for bounded $f$: once integer part exhausted (odd $n \geq 2T+1$), error $\leq 2^{-n/2}$. $\sigma$-algebra: by induction, each $A_n \in \sigma(f)$ since $f_{n-1} = f - g_{n-1}$ is $\sigma(f)$-measurable. $\square$
**Key technique:** Binary expansion / dyadic approximation
**Load-bearing:** yes

### theorem: Factorisation of measurable functions
**Number:** Theorem 12
**Plain English:** A random variable $g$ is $\sigma(f)$-measurable if and only if $g$ can be written as a measurable function of $f$ -- meaning $g$ depends on $\omega$ only through the value $f(\omega)$.
**Formal:** Let $f$ be any $(X, \mathcal{F}_X, \mu)$-valued random variable on $(\Omega, \mathcal{F}, \mathbb{P})$, and let $g$ be a $\mathbb{R}^{\pm\infty}$-valued random variable. Then the following are equivalent: (i) there exists a $(\mathcal{F}_X, \mathcal{B}(\mathbb{R}^{\pm\infty}))$-measurable $h : X \to \mathbb{R}^{\pm\infty}$ with $g(\omega) = h(f(\omega))$ for all $\omega$; (ii) $g$ is $\sigma(f)$-measurable.
**Proof:** (i) $\Rightarrow$ (ii): If $g = h \circ f$, then $g^{-1}(S) = f^{-1}(h^{-1}(S)) \in \sigma(f)$ for any Borel $S$. (ii) $\Rightarrow$ (i): For simple $g$, write $g = \sum \alpha_i \mathbf{1}_{A_i}$ minimally; each $A_r = g^{-1}(\{r\}) \in \sigma(f)$ gives $A_r = f^{-1}(B_r)$; define $h(x) = r$ on $B_r$. For non-negative $g$, approximate by simple $g_n \to g$ with $g_n = h_n \circ f$; let $h = \sup_n h_n$ (measurable by Theorem 5), then $h(f(\omega)) = \lim h_n(f(\omega)) = \lim g_n(\omega) = g(\omega)$. For general $g$, split $g = g^+ - g^-$ and apply the non-negative case to each part. $\square$
**Key technique:** Approximation by simple functions + pointwise limits
**Load-bearing:** yes

## Exercises

### exercise: Disjoint representation, max/min, and block/slab forms
**Number:** Exercise 3
**Difficulty:** standard
**Tags:** simple-functions, representation, disjoint-indicators

**Question:**
Suppose $f$ is a simple function. Prove that we can write $f$ as a finite sum of multiples of indicator functions of pairwise disjoint sets ("disjoint indicator representation"). Suppose that $f$ and $g$ are any two simple functions: prove that $\max(f, g)$ and $\min(f, g)$ are simple functions.

**Hint 1:** Use the Venn diagram decomposition
Given $f = \sum_{i=1}^n \alpha_i \mathbf{1}_{A_i}$, consider the $2^n$ sets $A_I = \bigcap_{i \in I} A_i \setminus \bigcup_{i \notin I} A_i$ for $I \subseteq [n]$. Why is $f$ constant on each $A_I$?

**Hint 2:** For max/min, refine both disjoint representations simultaneously
Write $f$ and $g$ in disjoint indicator form so that the indicators in both representations partition $\Omega$. On each piece, both functions are constant, so max and min are constant. How do you ensure both representations use the same partition?

**Solution:**
**Disjoint indicator representation.** Let $f = \sum_{i=1}^n \alpha_i \mathbf{1}_{A_i}$. For each $I \subseteq [n]$, define $A_I = \bigcap_{i \in I} A_i \setminus \bigcup_{i \notin I} A_i$. These $2^n$ sets are pairwise disjoint and their union is $\Omega$. On $A_I$, exactly the indicators $\mathbf{1}_{A_i}$ with $i \in I$ equal 1, so $f$ takes the constant value $\alpha_I = \sum_{i \in I} \alpha_i$. Hence $f = \sum_{I \subseteq [n]} \alpha_I \mathbf{1}_{A_I}$.

**Max and min.** Take disjoint indicator representations of $f$ and $g$ where both sets of indicators partition $\Omega$ (add $0 \cdot \mathbf{1}$ for the complement if needed). For each $\alpha \mathbf{1}_A$ in the representation of $f$ and $\beta \mathbf{1}_B$ in the representation of $g$, form the term $\max(\alpha, \beta) \mathbf{1}_{A \cap B}$ (or $\min(\alpha, \beta)$). Since the sets $A \cap B$ are pairwise disjoint and cover $\Omega$, this gives a disjoint indicator representation of $\max(f, g)$ (or $\min(f, g)$), which is simple by definition.

### exercise: Approximation construction works
**Number:** Exercise 4
**Difficulty:** standard
**Tags:** approximation, binary-expansion, simple-functions, sigma-algebra

**Question:**
Fill in the details of the approximation construction: prove that the sequence $(g_n)_{n \in \mathbb{N}} = \left(\sum_{i=1}^n \alpha_i \mathbf{1}_{A_i}\right)_{n \in \mathbb{N}}$ is a pointwise monotone increasing sequence which converges pointwise to $f$.

Prove that if $f$ is a bounded function, the convergence is uniform (i.e. for any given $\varepsilon > 0$ there is $N \in \mathbb{N}$ such that for all $x$ we have $|f(x) - g_n(x)| < \varepsilon$).

Prove that for all $n$ we have $\sigma(g_n) \subseteq \sigma(f)$. *(Hint: use induction.)*

**Hint 1:** For pointwise convergence, think in terms of binary expansions
The difference $g_n - g_{n-1} = \alpha_n \mathbf{1}_{A_n} \geq 0$, so the sequence is monotone increasing. For convergence, consider two cases: $f(\omega) = \infty$ (odd steps contribute at least $n/2$) and $f(\omega) < \infty$ (write $f(\omega) = t + 0.x_1 x_2 \ldots$ in binary).

**Hint 2:** For the $\sigma$-algebra containment, use induction on $n$
Base case: $\sigma(g_1) = \{\emptyset, A_1, A_1^c, \Omega\}$ where $A_1 = f^{-1}([1, \infty]) \in \sigma(f)$. Inductive step: assuming $\sigma(g_{n-1}) \subseteq \sigma(f)$, show $A_n \in \sigma(f)$ (because $A_n$ is defined via level sets of $f_{n-1}$, and $f_{n-1}$ is $\sigma(f)$-measurable by Theorem 5). Then $g_n$ generates its $\sigma$-algebra from $A_n$ together with $\sigma(g_{n-1})$.

**Solution:**
**Monotone increasing.** We have $g_n - g_{n-1} = \alpha_n \mathbf{1}_{A_n}$ where $\alpha_n \geq 0$, so $g_n \geq g_{n-1}$ pointwise. The sequence is monotone increasing and bounded above by $f$ (since each $f_n = f - g_n \geq 0$ by construction).

**Pointwise convergence.** Case 1: $f(\omega) = \infty$. For every odd $n$, we have $f_{n-1}(\omega) = \infty \geq 1$, so $\omega \in A_n$ and $g_n(\omega) \geq n/2 \to \infty$.

Case 2: $f(\omega) = t + x$ where $t \in \mathbb{N}_0$ and $0 \leq x < 1$. Write $x = 0.x_1 x_2 \ldots$ in binary. The odd steps peel off 1 each time $f_{n-1}(\omega) \geq 1$: after $2t$ odd steps, the integer part is exhausted. For even step $n = 2k$, the set $A_n$ detects whether the $k$-th binary digit of the remaining fractional part is 1. So $\omega \in A_{2k}$ iff $x_k = 1$. The sum $g_n(\omega)$ reconstructs $t + \sum_{k=1}^{\lfloor n/2 \rfloor} x_k 2^{-k} \to t + x = f(\omega)$.

**Uniform convergence for bounded $f$.** If $0 \leq f(\omega) \leq T$ for all $\omega$, then for odd $n \geq 2T + 1$, the integer part is fully removed and $A_n = \emptyset$. After that, only even steps contribute, and the remaining error satisfies $f(\omega) - g_n(\omega) \leq 2^{-n/2}$. Given $\varepsilon > 0$, choose even $N \geq 2T$ with $2^{-N/2} < \varepsilon$.

**$\sigma$-algebra containment.** By induction. Base: $\sigma(g_1) = \sigma(\mathbf{1}_{A_1})$ where $A_1 = f^{-1}([1, \infty]) \in \sigma(f)$. Inductive step: assume $\sigma(g_{n-1}) \subseteq \sigma(f)$. Since $f_{n-1} = f - g_{n-1}$ and both $f$ and $g_{n-1}$ are $\sigma(f)$-measurable (by Theorem 5 and the inductive hypothesis), $f_{n-1}$ is $\sigma(f)$-measurable. The set $A_n$ is defined as a level set of $f_{n-1}$: if $n$ is odd, $A_n = f_{n-1}^{-1}([1, \infty])$; if $n$ is even, $A_n$ is the inverse image of a Borel set under $f_{n-1}$. Either way, $A_n \in \sigma(f)$. Since $g_n = g_{n-1} + \alpha_n \mathbf{1}_{A_n}$ and both terms are $\sigma(f)$-measurable, $\sigma(g_n) \subseteq \sigma(f)$.

### exercise: Factorisation for simple functions
**Number:** Exercise 5
**Difficulty:** standard
**Tags:** factorisation, simple-functions, measurability, sigma-algebra

**Question:**
Suppose $g$ is a simple function that is $\sigma(f)$-measurable. Prove that there exists a measurable function $h$ such that $g(\omega) = h(f(\omega))$ for all $\omega$. *Hint: Use Exercise 3 to argue that for any $c$, there is at most one indicator function with coefficient $c$ in the representation of $g$.*

**Hint 1:** Start with a minimal disjoint indicator representation
By Exercise 3, write $g = \sum_{i=1}^t \alpha_i \mathbf{1}_{A_i}$ as a disjoint indicator representation. Show that by minimality, the $\alpha_i$ are pairwise distinct (if $\alpha_i = \alpha_j$, we could merge $A_i \cup A_j$).

**Hint 2:** Use $\sigma(f)$-measurability to express each $A_i$ via $f$
Since $g$ is $\sigma(f)$-measurable, the level sets $A_r = g^{-1}(\{r\})$ are in $\sigma(f)$. This means $A_r = f^{-1}(B_r)$ for some $B_r \in \mathcal{F}_X$. The sets $B_r \cap f(\Omega)$ partition $f(\Omega)$, but the $B_r$ might overlap in $X$. Refine them to be disjoint: set $B_1' = B_1$, $B_2' = B_2 \setminus B_1$, etc. Then define $h(x) = r$ if $x \in B_r'$.

**Solution:**
By Exercise 3, take a disjoint indicator representation $g = \sum_{i=1}^t \alpha_i \mathbf{1}_{A_i}$ with $t$ minimal. If $\alpha_i = \alpha_j$ for some $i \neq j$, we could replace $\alpha_i \mathbf{1}_{A_i} + \alpha_j \mathbf{1}_{A_j}$ with $\alpha_i \mathbf{1}_{A_i \cup A_j}$ (since $A_i, A_j$ are disjoint), contradicting minimality. So the $\alpha_i$ are pairwise distinct.

The range of $g$ is $R = \{0, \alpha_1, \ldots, \alpha_t\}$ (including 0 if $g$ vanishes somewhere), and the level sets $A_r = g^{-1}(\{r\})$ for $r \in R$ partition $\Omega$. Since $g$ is $\sigma(f)$-measurable, each $A_r \in \sigma(f)$, which means there exists $B_r \in \mathcal{F}_X$ with $A_r = f^{-1}(B_r)$.

The $A_r$ are pairwise disjoint, so the sets $B_r \cap f(\Omega)$ are pairwise disjoint (though the $B_r$ themselves might not be disjoint in $X$). We can refine: set $B_1' = B_1$, $B_2' = B_2 \setminus B_1$, etc. These are still in $\mathcal{F}_X$ and still satisfy $A_r = f^{-1}(B_r')$ for all $r \in R$.

Define $h : X \to \mathbb{R}^{\pm\infty}$ by $h(x) = r$ if $x \in B_r'$ for some $r \in R$, and $h(x) = 0$ otherwise. Then $h$ is $(\mathcal{F}_X, \mathcal{B}(\mathbb{R}^{\pm\infty}))$-measurable (it's a simple function on $X$), and for any $\omega \in \Omega$: since $\omega \in A_r$ for exactly one $r$, we have $f(\omega) \in B_r'$, so $h(f(\omega)) = r = g(\omega)$.
