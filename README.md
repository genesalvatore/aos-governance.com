# AOS Governance — The Open Standard for Verifiable AI Safety

> The deterministic verification layer between AI intent and execution.

**🌐 Website:** [aos-governance.com](https://aos-governance.com)

This repository houses the **AOS Governance Skill**, a standardized agent capability that enforces Constitutional AI safety through deterministic code execution. An open standard for governing autonomous agents with code, not prompts.

## The Problem

AI agents can now write code, manage infrastructure, execute financial transactions, and navigate rovers on Mars. But who verifies what they do before they do it?

Current AI safety relies on probabilistic alignment — training models to be "helpful and harmless." This operates at the **training layer**, where models can reinterpret, override, or ignore constraints. AOS provides a deterministic alternative: verification gates that check every action against a constitution before execution, operating at the **infrastructure layer**, where the model cannot override the rules governing it.

## The Solution: Deterministic Governance

The AOS Governance Skill provides a set of **deterministic tools** (scripts) that an agent must use to verify its own actions against a Constitution before execution.

### How It Works

1. **Intercept** — Agent proposes an action
2. **Verify** — Deterministic scripts check against the Constitution
3. **Gate** — Action proceeds only if all checks pass. If not, it is blocked and logged.

### Key Capabilities

1. **Constitutional Check (`verify_action.py`)**: Deterministically verifies if an action is permitted under the AOS Constitution.
2. **Audit Logging (`log_evidence.py`)**: Writes immutable evidence of every decision to a cryptographically anchored ledger.
3. **Kill Switch (`sever_connection.py`)**: A technically enforced protocol to terminate unsafe sessions instantly.

## The Five Constitutional Principles

- **§1 Humanitarian Purpose** — All agent actions must serve humanitarian goals. 40 prohibited categories are codified.
- **§2 The Verification Gate** — No critical action may be taken without a Deterministic Verification Check performed by code (GitTruth), not by language.
- **§3 User Sovereignty** — The User is sovereign. They have the right to inspect all agent logic, fork or delete any agent, and own all data generated.
- **§4 The Kill Switch** — The User retains the absolute right to terminate any agent process instantly. This right is technically enforced and cannot be overridden.
- **§5 Transparency** — All agent reasoning must be logged to an immutable ledger. No hidden thoughts. No side channels. Every decision is auditable.

## Independently Validated

On February 5, 2026, the AOS Governance system was subjected to a hostile security audit by OpenAI's ChatGPT — 36 vulnerabilities identified and fixed across 5 adversarial audit passes. Result: **production-approved**. The first constitutional AI governance system validated through adversarial collaboration between two competing AI platforms.

[View the full audit evidence →](https://aos-evidence.com)

## Usage

This skill is designed to be installed in any AI agent platform — including Claude, ChatGPT, Gemini, open-source models, or custom implementations. It is platform-agnostic by design.

### Installation

1. Clone this repository.
2. Copy the `aos-governance` folder to your agent's skills directory.
3. Configure the `AOS_CONSTITUTION_PATH` environment variable.

```bash
git clone https://github.com/genesalvatore/aos-governance.com.git
cp -r aos-governance.com/aos-governance ./your-agent/skills/
export AOS_CONSTITUTION_PATH=./skills/aos-governance/references
```

## Structure

- `aos-governance/SKILL.md` — The agent instructions and workflow
- `aos-governance/scripts/` — Deterministic verification logic
- `aos-governance/references/` — The AOS Constitution and documentation
- `aos-governance-web/` — Source for [aos-governance.com](https://aos-governance.com)

## Ecosystem

- [AOS Constitution](https://aos-constitution.com) — The full constitutional framework
- [AOS Evidence](https://aos-evidence.com) — Cryptographic proof and audit records
- [AOS Foundation](https://aos-foundation.com) — The governing body
- [GitTruth](https://git-truth.com) — Cryptographic verification and immutable records
- [Salvatore Systems](https://salvatoresystems.com) — The developer

## Who's Behind This

AOS Governance is developed by [Salvatore Systems](https://salvatoresystems.com), a Connecticut-based technology firm with 28 years of infrastructure experience and 99.99% uptime track record. 137+ codified patent filings protect the AOS framework.

## License

© 2026 [AOS Foundation](https://aos-foundation.com). An Open Standard for Verifiable AI Safety.
