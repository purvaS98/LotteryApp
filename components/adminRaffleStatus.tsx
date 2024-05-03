import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { RAFFLE_CONTRACT_ADDRESS } from "../const/addresses";
import { useState } from "react";
import { Box, Card, Input, Stack, Text } from "@chakra-ui/react";
import RaffleStatus from "./raffleStatus";

export default function AdminRaffleStatus() {
    const {
        contract
    } = useContract(RAFFLE_CONTRACT_ADDRESS);
    const {
        data: raffleStatus
    } = useContractRead(contract, "raffleStatus")

    const [nftContractAddress, setNftContractAddress] = useState("");
    const [tokenId, setTokenId] = useState(0);

    function reset() {
        setNftContractAddress("");
        setTokenId(0);
    }

    return (
        <Card p={4} mt={4} mr={10} w={"25%"}>
            <Text fontWeight={"bold"} mb={4} fontSize={"x-large"}>Raffle Status:</Text>
            <RaffleStatus raffleStatus={raffleStatus} />
            {!raffleStatus ? (
                <Stack spacing={4} mt={4}>
                    <Box>
                        <Text>Prize Contract Address:</Text>
                        <Input 
                            placeholder={"0x..........."}
                            type="text"
                            value={nftContractAddress}
                            onChange={(e) => setNftContractAddress(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <Text>Prize Token ID:</Text>
                        <Input 
                            placeholder={"0"}
                            type="number"
                            value={tokenId}
                            onChange={(e) => setTokenId(parseInt(e.target.value))}
                        />
                    </Box>
                    <Web3Button contractAddress={RAFFLE_CONTRACT_ADDRESS}
                        action={(contract) => contract.call("startRaffle",
                            [
                                nftContractAddress,
                                tokenId
                            ]
                        )}
                        onSuccess={reset}
                        >Start Raffle</Web3Button>
                </Stack>
            ): (
                <Stack mt={4}>
                    <Web3Button contractAddress={RAFFLE_CONTRACT_ADDRESS}
                        action={(contract) => 
                            contract.call("endRaffle")}
                        onSuccess={reset}
                        >End Raffle</Web3Button>
                </Stack>
            )}
        </Card>
    )
}