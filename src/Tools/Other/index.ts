import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const getFingerprint = async () => {
	const agent = await FingerprintJS.load();
	const {visitorId} = await agent.get();
	return visitorId;
}