package com.cbt.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.cbt.entity.QuoteReportType;
import com.cbt.entity.QuoteWeeklyReport;
import org.apache.ibatis.annotations.Param;

public interface QuoteWeeklyReportService {

	
    /**
     * 查询图片类型  根据日期显示
     * @Title queryByOrderId 
     * @Description
     * @return
     * @return List<QuoteWeeklyReport>
     */
   public List<QuoteWeeklyReport> queryByOrderId(Integer orderId);
   
   
   
   
   public QuoteWeeklyReport selectByPrimaryKey(Integer id);
   
   
   
   public int updateByPrimaryKeySelective(QuoteWeeklyReport record);
   
   
   
   /**
    * 根据询盘号和上传时间查询图片
    * @Title queryByOrderIdAndDate 
    * @Description TODO
    * @param orderId
    * @param uploadDate
    * @return
    * @return List<QuoteWeeklyReport>
    */
   public List<QuoteWeeklyReport> queryByOrderIdAndDate(Integer orderId,String uploadDate);
   
   
   /**
    * 供应商查询所有图片 文档 
    * @Title queryByOrderIdAndSupplier 
    * @Description TODO
    * @param orderId
    * @return
    * @return List<QuoteWeeklyReport>
    */
   public List<QuoteWeeklyReport> queryByOrderIdAndSupplier(Integer orderId);
   
   
   /**
    * 插入周报
    * @Title insertSelective 
    * @Description TODO
    * @param record
    * @return
    * @return int
    */
   public int insertSelective(HttpServletRequest request,QuoteWeeklyReport record,QuoteReportType report);
   
   
   /**
    * 根据id删除
    * @Title deleteByPrimaryKey 
    * @Description TODO
    * @param id
    * @return
    * @return int
    */
   public int deleteByPrimaryKey(Integer id);
   
   
   
   /**
    * 批量插入周报图片
    * @Title insertPhotosBatch 
    * @Description TODO
    * @param
    * @return void
    */
   public void insertPhotosBatch(HttpServletRequest request,List<QuoteWeeklyReport> report) throws Exception;


   int updateByPrimaryKey(QuoteWeeklyReport record);





   /**
    * 根据类型和阶段查询报告
    * @param csgOrderId
    * @param type
    * @param
    * @return
    */
   List<QuoteWeeklyReport> queryByCsgOrderIdAndType(String csgOrderId, Integer type,String factoryId);



   /**
    * 查询最近上传日期
    * @param csgOrderId
    * @param factoryId
    * @return
    */
   String queryMaxUploadDate(String csgOrderId,String factoryId);


   /**
    * 查询所有报告
    * @return
    */
   List<QuoteWeeklyReport> selectAll();
}
