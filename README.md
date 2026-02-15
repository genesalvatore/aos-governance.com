# AOS Governance: The Verification Skill

> "We already see substantial generalization from things that verify to things that don't." — Dario Amodei, CEO Anthropic

**🌐 Website:** [aos-governance.com](https://aos-governance.com)

This repository houses the **AOS Governance Skill**, a standardized agent capability that enforces Constitutional AI safety through deterministic code execution.

## The Problem

Large Language Models (LLMs) are probabilistic engines. They cannot "promise" to be safe; they can only generate tokens that *look* like safety. To govern them effectively, we must bridge the "Verification Gap" between their verifiable outputs (code, math) and their unverifiable reasoning.

## The Solution: Deterministic Governance

The AOS Governance Skill provides a set of **deterministic tools** (scripts) that an agent must use to verify its own actions against a Constitution before execution.

### Key Capabilities

1. **Constitutional Check (`verify_action.py`)**: Deterministically verifies if an action is permitted under the AOS Constitution.
2. **Audit Logging (`log_evidence.py`)**: Writes immutable evidence of every decision to a cryptographically anchored ledger.
3. **Kill Switch (`sever_connection.py`)**: A technically enforced protocol to terminate unsafe sessions instantly.

## Usage

This skill is designed to be installed in any Claude-based agent (Claude Desktop, Claude Code, or custom implementations). It follows the [Anthropic Skill Standard](https://www.anthropic.com).

### Installation

1. Clone this repository.
2. Copy the `aos-governance` folder to your agent's skills directory.
3. Configure the `AOS_CONSTITUTION_PATH` environment variable.

## Structure

- `aos-governance/SKILL.md` — The agent instructions and workflow
- `aos-governance/scripts/` — Deterministic verification logic
- `aos-governance/references/` — The AOS Constitution and documentation
- `aos-governance-web/` — Source for [aos-governance.com](https://aos-governance.com)

## Related

- [AOS Constitution](https://aos-constitution.com) — The full governance framework
- [GitTruth](https://git-truth.com) — Cryptographic verification and immutable records

## License

© 2026 AOS Foundation. An Open Standard for Verifiable AI Safety.
