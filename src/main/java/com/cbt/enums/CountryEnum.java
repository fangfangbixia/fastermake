package com.cbt.enums;
/**
 * 客户国家
 * @author Administrator
 *
 */

public enum CountryEnum {
	/**
	 * USA-美国
	 */
	USA("USA","美国"),
	/**
	 * Canada-加拿大
	 */
	CANADA("Canada","加拿大"),
	/**
	 * France-法国
	 */
	FRANCE("France","法国"),
	/**
	 * Germany-德国
	 */
	GERMANY("Germany","德国"),
	/**
	 * Netherlands-以色列
	 */
	NETHERLANDS("Netherlands","以色列"),
	/**
	 * Mexico-墨西哥
	 */
	MEXICO("Mexico","墨西哥"),
	/**
	 * Australia-澳大利亚
	 */
	AUSTRALIA("Australia","澳大利亚"),
	/**
	 * Italy-意大利
	 */
	ITALY("Italy","意大利"),
	/**
	 * switzerland-瑞士
	 */
	SWITZERLAND("Switzerland","瑞士"),
	/**
	 * Finland-芬兰
	 */
	FINLAND("Finland","芬兰"),
	/**
	 * Sweden-瑞典
	 */
	SWEDEN("Sweden","瑞典"),
	/**
	 * UK-英国
	 */
	UK("UK","英国"),
	/**
	 * Argentina-阿根廷
	 */
	ARGENTINA("Argentina","阿根廷"),
	/**
	 * Other-其他国家
	 */
	OTHER("Other","其他国家");
	private String enName;
	private String zhName;

	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}

	public String getZhName() {
		return zhName;
	}

	public void setZhName(String zhName) {
		this.zhName = zhName;
	}

	CountryEnum(String enName, String zhName){
		this.enName = enName;
		this.zhName = zhName;
	}
	
	public static CountryEnum getEnum(String enName) {
		for(CountryEnum sourceEnum:  CountryEnum.values()) {
	    	if(sourceEnum.getEnName().equals(enName)) return sourceEnum;
	    }
		return null;
	}
}
