
import { network } from "hardhat";

const { ethers } = await network.connect();

const DVote = await ethers.getContractFactory("DVote");

const dvote = await DVote.deploy();

await dvote.waitForDeployment();

console.log("DVote deployed at:", await dvote.getAddress());
