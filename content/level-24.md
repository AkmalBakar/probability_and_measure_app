---
level: 24
title: "Binomial Financial Model"
status: wip
notes: 6
prerequisites: [23, 16]
---

# Level 24: Binomial Financial Model

## Reading

We now bring together martingales, stopping times, and the Radon-Nikodym theorem to build a simple but powerful financial model. The key insight: option pricing is fundamentally a **martingale problem**, and the "right" probability measure for pricing is not the "real-world" measure but a special **risk-neutral measure**.

### The model setup

Consider a market with one stock and one risk-free bond. At time 0, the stock price is $S_0 > 0$ and the bond price is $B_0 > 0$. We are given fixed numbers $-1 < a < r < b < \infty$, and a sequence $(Y_t)_{t \geq 1}$ taking values in $\{-1, 1\}$ (representing market moves). The prices evolve as:

$$B_t = B_{t-1}(1+r), \qquad S_t = S_{t-1} \cdot \begin{cases} (1+a) & \text{if } Y_t = -1 \\ (1+b) & \text{if } Y_t = 1 \end{cases}$$

Here $r$ is the risk-free interest rate, $1+a$ is the "down factor" and $1+b$ is the "up factor" for the stock. The condition $a < r < b$ ensures the stock is genuinely risky: it can outperform or underperform bonds.

We use the filtration $\mathcal{F}_n = \sigma(Y_1, \ldots, Y_n)$. At the moment, there is **no probability measure** — everything so far is deterministic, and we use the probabilistic notation purely as bookkeeping.

### European options and hedging strategies

A **European option** with maturity $N$ and strike price $K$ gives the holder the right (but not the obligation) to buy one unit of stock at price $K$ at time $N$. Its payoff is $\max(S_N - K, 0)$: if $S_N \geq K$, exercise the option and gain $S_N - K$; if $S_N < K$, let it expire worthless.

A **hedging strategy** for the option, with initial value $x$, is a process $(A_n, V_n)_{n \geq 0}$ adapted to $(\mathcal{F}_n)$ satisfying:

- $x = A_0 S_0 + V_0 B_0$ (initial wealth split between $A_0$ units of stock and $V_0$ units of bond),
- $A_n S_{n+1} + V_n B_{n+1} = A_{n+1}S_{n+1} + V_{n+1}B_{n+1}$ for $n \geq 0$ (self-financing: trades don't create or destroy wealth),
- $A_{N-1}S_N + V_{N-1}B_N = \max(S_N - K, 0)$ (terminal wealth matches the option payoff).

The self-financing condition means: immediately after seeing $S_{n+1}$, the player rebalances from $(A_n, V_n)$ to $(A_{n+1}, V_{n+1})$ at the new prices, with no net cash flow.

### Fair price and uniqueness

If a hedging strategy with initial value $x$ exists, then $x$ is the **unique fair price** for the option:

- If the option is sold for $x' > x$: the seller pockets $x' - x$ in bonds and follows the hedging strategy with $x$. At time $N$, the hedging strategy replicates the option payoff exactly, so the seller keeps $(1+r)^N(x'-x) > 0$ profit risk-free.
- If the option is sold for $x' < x$: the buyer buys the option, takes the **negative** of the hedging strategy (short stock, long bonds to offset), and similarly locks in a risk-free profit.

Either way, someone gets free money. The only price that prevents arbitrage is $x$.

### The $N = 1$ case

For $N = 1$, we need $A_0, V_0$ such that $x = A_0 S_0 + V_0 B_0$ and:

$$A_0(1+a)S_0 + V_0(1+r)B_0 = \max((1+a)S_0 - K, 0)$$
$$A_0(1+b)S_0 + V_0(1+r)B_0 = \max((1+b)S_0 - K, 0).$$

This is a $2 \times 2$ linear system. Since $a \neq b$, the matrix $\begin{pmatrix}(1+a)S_0 & (1+r)B_0 \\ (1+b)S_0 & (1+r)B_0\end{pmatrix}$ is non-singular, giving a unique $(A_0, V_0)$ and hence a unique fair price $x$.

### The binomial tree and recombining property

For general $N$, we iterate: the **binomial tree** starts with one node at time 0, each node has two children (up and down), giving $2^N$ leaves at time $N$. Each leaf has a known option payoff. Working backwards from time $N$, at each node we solve the $N=1$ problem to find the hedging strategy and option value.

A crucial observation: the binomial tree is **recombining**. An up-move followed by a down-move gives the same stock price as a down-move followed by an up-move: $S_0(1+a)(1+b) = S_0(1+b)(1+a)$. This means the option value and hedging strategy at any node depend only on $S_t$ (the current stock price) and not on the specific path taken.

This reduces the number of nodes from $2^N$ to $\sum_{i=0}^{N-1}(i+1) = O(N^2)$, making computation practical.

### The risk-neutral measure

Here is the key trick: define a probability measure $\mathbb{Q}$ on $\Omega$ by making the $Y_t$ independent with:

$$\mathbb{Q}(Y_t = 1) = q := \frac{r - a}{b - a}, \qquad \mathbb{Q}(Y_t = -1) = 1 - q = \frac{b - r}{b - a}.$$

The choice of $q$ is precisely so that the **discounted stock price** is a $\mathbb{Q}$-martingale. Define the discounted wealth:

$$W_t = (1+r)^{-t}(A_t S_t + V_t B_t).$$

Then:

$$\mathbb{E}_\mathbb{Q}(A_t S_{t+1} + V_t B_{t+1} | \mathcal{F}_t) = A_t(q(1+b) + (1-q)(1+a))S_t + V_t(1+r)B_t = (1+r)(A_t S_t + V_t B_t),$$

where the crucial step uses $q(1+b) + (1-q)(1+a) = 1 + qb + (1-q)a = 1 + r$ (by definition of $q$). So $W_t$ is a $\mathbb{Q}$-martingale.

This measure $\mathbb{Q}$ is called the **risk-neutral measure**. Under $\mathbb{Q}$, investing in stock has the same expected return as bonds — hence "risk-neutral." The measure has **nothing to do with reality**; it's a computational tool.

### The pricing theorem

**Theorem 4.** Given $-1 < a < r < b < \infty$, $S_0, B_0, K > 0$, and $N \in \mathbb{N}$, the value at time 0 of the European option with maturity $N$ and strike price $K$ is

$$\mathbb{E}_\mathbb{Q}\!\left((1+r)^{-N}\max(S_N - K, 0)\right).$$

*Proof.* Since a hedging strategy $(A_n, V_n)$ exists (constructed by backward induction), and the discounted wealth $W_t = (1+r)^{-t}(A_{t-1}S_t + V_{t-1}B_t)$ is a $\mathbb{Q}$-martingale, we have:

$$\mathbb{E}_\mathbb{Q}\!\left((1+r)^{-N}\max(S_N - K, 0)\right) = \mathbb{E}_\mathbb{Q}\!\left((1+r)^{-N}(A_{N-1}S_N + V_{N-1}B_N)\right) = \mathbb{E}_\mathbb{Q}(W_N).$$

By the martingale property: $\mathbb{E}_\mathbb{Q}(W_N) = \mathbb{E}_\mathbb{Q}(W_N | \mathcal{F}_0) = W_0 = A_0 S_0 + V_0 B_0 = x$. $\square$

The formula can be computed explicitly: $S_N = S_0(1+a)^{N-k}(1+b)^k$ where $k$ counts the number of up-moves, which under $\mathbb{Q}$ is Binomial$(N, q)$.

### Monte Carlo pricing

The formula $\mathbb{E}_\mathbb{Q}((1+r)^{-N}\max(S_N - K, 0))$ is an expectation — so we can estimate it by **Monte Carlo**: sample many paths under $\mathbb{Q}$, compute the payoff for each, and average. Since $q$ can be approximated using random bits (accept if the $s$-digit binary string represents a number $< q$, with at most $2^{-s}$ error), this is computationally efficient.

Moreover, Monte Carlo can approximate the hedging strategy: compute the discounted option value for the two children of a given node (by Monte Carlo), then solve the linear system as in the $N = 1$ case.

### Martingale transform connection

By Exercise 2 (Level 22), the discounted wealth martingale $W'_n = \mathbb{E}_\mathbb{Q}((1+r)^{-N}\max(S_N-K,0) | \mathcal{F}_n)$ can be written as a martingale transform: let $Z_i = Y_i - (2q-1)$ (which has $\mathbb{E}_\mathbb{Q}(Z_i) = 0$). Then there is a unique $(\mathcal{F}_n)$-adapted process $(C'_n)$ with $W'_n = W'_0 + \sum_{i=1}^n C'_{i-1}Z_i$. The hedging strategy is recovered from the transform:

$$A'_n = C'_n \cdot \frac{2}{b-a} \cdot (1+r)^n S_n^{-1},$$

and $V_n$ is chosen to satisfy the self-financing condition. The martingale representation theorem thus provides an alternative, elegant route to proving the existence and uniqueness of the hedging strategy.

### Black-Scholes connection

As $N \to \infty$ with $a, b \to r$ (so that the time step shrinks), the stock's volatility is captured by a single parameter $\sigma$. By the CLT, $S_N$ converges in distribution to a log-normal, and the binomial pricing formula converges to the **Black-Scholes formula**. This is the standard route from discrete to continuous financial mathematics.

## Key Results

### theorem: Option pricing formula
**Number:** Theorem 4
**Plain English:** The fair price of a European option equals the expected discounted payoff under the risk-neutral measure $\mathbb{Q}$, where up-moves have probability $q = \frac{r-a}{b-a}$.
**Formal:** Value $= \mathbb{E}_\mathbb{Q}((1+r)^{-N}\max(S_N - K, 0))$, where under $\mathbb{Q}$ the $Y_t$ are i.i.d. with $\mathbb{Q}(Y_t=1) = q = \frac{r-a}{b-a}$.
**Proof sketch:** Construct hedging strategy by backward induction. Show discounted wealth is a $\mathbb{Q}$-martingale (by choice of $q$ making $q(1+b)+(1-q)(1+a)=1+r$). Apply martingale property: $\mathbb{E}_\mathbb{Q}(W_N) = W_0 = x$.
**Key technique:** Risk-neutral pricing, martingale property
**Depends on:** Martingale representation (Level 22), conditional expectation (Level 15), Radon-Nikodym (Level 16)
**Used by:** Black-Scholes (continuous limit), Monte Carlo pricing
**Load-bearing:** yes

## Exercises

### exercise: Hedging strategy for $N = 1$
**Number:** Exercise 5
**Difficulty:** standard
**Tags:** binomial-model, hedging, linear-algebra, option-pricing

**Question:**
Suppose $N = 1$. Given $a, b, r, S_0$ and $B_0$, determine a hedging strategy and hence a fair price for the option explicitly. Explain why the hedging strategy and fair price are unique.

**Hint 1:** Set up the linear system
If $K > (1+b)S_0$: the option is never exercised, value is 0. If $K < (1+a)S_0$: always exercised, value is $S_0 - K(1+r)^{-1}$. Otherwise, solve $A_0(1+a)S_0 + V_0(1+r)B_0 = 0$ and $A_0(1+b)S_0 + V_0(1+r)B_0 = (1+b)S_0 - K$.

**Hint 2:** Uniqueness
The matrix $\begin{pmatrix}(1+a)S_0 & (1+r)B_0 \\ (1+b)S_0 & (1+r)B_0\end{pmatrix}$ has non-zero determinant since $a \neq b$, so there's a unique solution $(A_0, V_0)$.

**Solution:**
We need $(A_0, V_0)$ satisfying two equations — one for the down-move ($Y_1 = -1$), one for the up-move ($Y_1 = 1$):

$$A_0(1+a)S_0 + V_0(1+r)B_0 = \max((1+a)S_0 - K, 0)$$
$$A_0(1+b)S_0 + V_0(1+r)B_0 = \max((1+b)S_0 - K, 0).$$

**Case 1:** $K > (1+b)S_0$. Both RHS are 0, so $A_0 = V_0 = 0$ and the fair price is 0.

**Case 2:** $K < (1+a)S_0$. Both RHS are $(1+a)S_0 - K$ and $(1+b)S_0 - K$ respectively. The hedging strategy is $A_0 = 1$ (buy one unit of stock) and $V_0 = -K(1+r)^{-1}B_0^{-1}$ (take a short position $K(1+r)^{-1}$ in bonds). The fair price is $S_0 - K(1+r)^{-1}$.

**Case 3:** $(1+a)S_0 \leq K \leq (1+b)S_0$. The system becomes:

$$A_0(1+a)S_0 + V_0(1+r)B_0 = 0$$
$$A_0(1+b)S_0 + V_0(1+r)B_0 = (1+b)S_0 - K.$$

The matrix $\begin{pmatrix}(1+a)S_0 & (1+r)B_0 \\ (1+b)S_0 & (1+r)B_0\end{pmatrix}$ has determinant $(b-a)S_0(1+r)B_0 \neq 0$ (since $a \neq b$), so there is a unique $(A_0, V_0)$. The fair price $x = A_0 S_0 + V_0 B_0$ is uniquely determined.

**Uniqueness:** The $2 \times 2$ matrix is non-singular in all cases (since $a \neq b$), so $(A_0, V_0)$ is always unique, and hence the hedging strategy and fair price are unique. $\square$

### exercise: Recombining property
**Number:** Exercise 6
**Difficulty:** standard
**Tags:** binomial-model, recombining, computation, induction

**Question:**
This particular model is recombining, meaning that in fact the value of the option and hedging strategy at a given time $t$ node depends only on $S_t$ and not on the specific sequence of moves up and down to reach the node. Explain why this is the case. *Hint: use induction, working backwards in time.*

Explain why this reduces the number of calculations required to obtain a complete hedging strategy and option value to something on the order of $N^2$.

**Hint 1:** Induction base
At time $N$, the payoff $\max(S_N - K, 0)$ depends only on $S_N$, not the path.

**Hint 2:** Induction step
If the option value at time $t+1$ depends only on $S_{t+1}$, and two time-$t$ nodes $P, Q$ have the same $S_t$, then their children agree: the up-child of $P$ has $S_{t+1} = (1+b)S_t = $ the up-child of $Q$, and similarly for down. So the linear system determining $(A_t, V_t)$ is the same at $P$ and $Q$.

**Solution:**
**Induction.** At time $N$: $\max(S_N - K, 0)$ depends only on $S_N$, not the path. $\checkmark$

Suppose the claim holds at time $t+1$: the option value and hedging strategy at each time-$(t+1)$ node depend only on $S_{t+1}$.

Consider two time-$t$ nodes $P$ and $Q$ with the same value of $S_t$. The children of $P$ are time-$(t+1)$ nodes with stock prices $(1+b)S_t$ (up) and $(1+a)S_t$ (down). The children of $Q$ have exactly the same stock prices. By the induction hypothesis, the option values at these children agree: $v_u$ at stock price $(1+b)S_t$ and $v_d$ at $(1+a)S_t$.

The hedging strategy $(A_t, V_t)$ at each node is determined by solving:

$$A_t(1+a)S_t + V_t(1+r)B_t = v_d, \quad A_t(1+b)S_t + V_t(1+r)B_t = v_u.$$

Since $S_t$, $B_t = B_0(1+r)^t$, $v_u$, and $v_d$ are the same at $P$ and $Q$, the solution $(A_t, V_t)$ is the same, and hence the option value $A_t S_t + V_t B_t$ is the same. This completes the induction.

**Computation:** At time $t$, the possible stock prices are $S_0(1+a)^{t-k}(1+b)^k$ for $k = 0, 1, \ldots, t$. So there are $t+1$ distinct nodes at time $t$. The total number of nodes is $\sum_{t=0}^{N}(t+1) = \frac{(N+1)(N+2)}{2} = O(N^2)$. Each node requires a constant-time linear algebra computation. So the total work is $O(N^2)$, compared to $O(2^N)$ without recombining. $\square$

### exercise: Monte Carlo option pricing
**Number:** Exercise 7
**Difficulty:** standard
**Tags:** Monte-Carlo, option-pricing, hedging-strategy, risk-neutral

**Question:**
Explain why using Monte Carlo estimation to find approximately the discounted value of the option for the two possible stock prices at time 1 allows us to decide on the correct hedging strategy at time 0. To simplify calculation, assume (which isn't exactly true!) that Monte Carlo estimation does not make any error in approximating the discounted value.

Explain how to generalise this, using roughly $N$ calculations at each time step, to find the correct hedging strategy for whatever path the stock prices actually take.

**Hint 1:** Time 0 strategy from Monte Carlo
By Theorem 4, the discounted option value at each time-1 node is $\mathbb{E}_\mathbb{Q}((1+r)^{-N}\max(S_N-K,0) | \mathcal{F}_1)$. Estimate this by Monte Carlo for each of the two values of $S_1$: sample many paths from $S_1$ forward under $\mathbb{Q}$, compute payoffs, average. Then solve the $N=1$ linear system.

**Hint 2:** Generalisation
At each time $t$, observe $S_t$, use Monte Carlo to estimate the two values $v_u, v_d$ for $S_{t+1} = (1+b)S_t$ and $(1+a)S_t$, solve the linear system for $(A_t, V_t)$, and trade. This requires roughly $N$ Monte Carlo estimates per time step (or just 2 per step if you only estimate at the realized node).

**Solution:**
**Time 0:** By Theorem 4, the option value at any time-1 node with stock price $S_1$ is $\mathbb{E}_\mathbb{Q}((1+r)^{-(N-1)}\max(S_N - K, 0) | S_1)$. We compute this for the two possible values $S_1 = (1+b)S_0$ (call this $v_u$) and $S_1 = (1+a)S_0$ (call this $v_d$) by Monte Carlo: for each, sample many independent paths under $\mathbb{Q}$ from $S_1$ to time $N$, compute the discounted payoff, and average.

Assuming no Monte Carlo error, $v_u$ and $v_d$ are exact. We solve the linear system from Exercise 5 to find the unique $(A_0, V_0)$ and the fair price $x = A_0 S_0 + V_0 B_0$.

**Generalisation:** At each time $t$ (after observing the actual stock price $S_t$), we need to decide $(A_t, V_t)$. We perform two Monte Carlo estimates: one for $v_u = \mathbb{E}_\mathbb{Q}((1+r)^{-(N-t-1)}\max(S_N - K, 0) | S_{t+1} = (1+b)S_t)$ and one for $v_d$ (with $S_{t+1} = (1+a)S_t$). Solving the linear system gives $(A_t, V_t)$, and we trade accordingly.

This requires 2 Monte Carlo estimations at each of the $N$ time steps, so roughly $O(N)$ calculations in total (per path). The total is still $O(N^2)$ calculations as with the deterministic approach, but the Monte Carlo method is more flexible: it doesn't require storing the full tree, and it works even for **path-dependent options** (like Asian options) where the recombining property fails and the deterministic approach would need $O(2^N)$ computations.

The caveat: Monte Carlo estimation introduces errors. In practice, one should check how these errors accumulate over $N$ steps and whether the resulting hedging strategy remains close to optimal. $\square$
